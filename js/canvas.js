document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector('#mainCanvas');
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const tools = document.querySelectorAll(".tool");
    const MainColor = document.querySelector('#mainColor');
    const brashSize = document.querySelector('#brashSize');

    let painting = false;
    let chosenTool = "brush";

    canvas.height = window.innerHeight - (0.08 * window.innerHeight);
    canvas.width = window.innerWidth;

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function endPosition() {
        painting = false;
        ctx.beginPath();
    }

    function choseTool() {
        chosenTool = this.id;
    }

    function ctxConfig(Tool) {
        ctx.lineWidth = brashSize.value;
        ctx.lineCap = "round";

        if (Tool == "brush") {
            ctx.strokeStyle = MainColor.value;
            console.log("brush");
        } else if (Tool == "eraser") {
            ctx.strokeStyle = "#fff";
            console.log("eraser");
        }
    }

    function draw(e) {
        if (!painting)
            return;

        ctxConfig(chosenTool);
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);

    }

    tools.forEach(tool => {
        tool.addEventListener("click", choseTool)
    });
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseout", endPosition);
});