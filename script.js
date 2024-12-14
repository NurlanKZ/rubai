const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin-btn");
const resultDiv = document.getElementById("result");

const options = [
    { label: "Hawker Chan", color: "#FF5733" },  // Warm red-orange
    { label: "KFC", color: "#1E8B5B" },         // Deep green
    { label: "Hardees", color: "#FFB833" },     // Golden yellow
    { label: "Burger King", color: "#4A90E2" }, // Cool blue
    { label: "Popeyes", color: "#FF4F00" },     // Vivid orange
    { label: "Лепим и варим", color: "#D95E97" }, // Soft pink
    { label: "Алые паруса", color: "#E71D36" }, // Bold crimson
    { label: "Coco", color: "#F9A602" },        // Bright yellow-orange
    { label: "Dodo Pizza", color: "#32A852" },  // Fresh green
];

const numOptions = options.length;
const anglePerSlice = (2 * Math.PI) / numOptions;

function drawWheel() {
    for (let i = 0; i < numOptions; i++) {
        const startAngle = i * anglePerSlice;
        const endAngle = startAngle + anglePerSlice;

        ctx.beginPath();
        ctx.moveTo(250, 250); // Center of the canvas
        ctx.arc(250, 250, 200, startAngle, endAngle);
        ctx.fillStyle = options[i].color;
        ctx.fill();
        ctx.stroke();

        // Draw text
        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate(startAngle + anglePerSlice / 2);
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.font = "20px Arial";
        ctx.fillText(options[i].label, 100, 10);
        ctx.restore();
    }
}

let rotationDegree = 0;

spinBtn.addEventListener("click", () => {
    const spinBtn = document.getElementById("spin-btn");

    // To hide the button
    spinBtn.style.visibility = "hidden"

    const randomDegree = 160 + Math.floor(Math.random() * 30) + 360 * Math.floor(Math.random() * 3+3);
    rotationDegree += randomDegree;

    // Animate the spin
    canvas.style.transition = "transform 2s ease-out";
    canvas.style.transform = `rotate(${rotationDegree}deg)`;

    setTimeout(() => {
        const finalAngle = rotationDegree % 360; // Get final angle after spins
        const selectedIndex = Math.floor(finalAngle / (360 / numOptions));
        
        resultDiv.style.visibility = "visible";
        resultDiv.innerHTML = `Today you shall eat at: ${options[selectedIndex].label}`;
    
        // // Reset for next spin
        // setTimeout(() => {
        //     canvas.style.transition = "none"; // Disable transition for immediate reset
        //     canvas.style.transform = `rotate(${rotationDegree}deg)`; // Keep final position
        // }, 4000);
        
    }, 2000); // Match timeout with animation duration
});

// Initial draw of the wheel
drawWheel();
