window.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let isErasing = false;
    let penColor = '#000000';
    let backgroundColor = '#ffffff';
    let penThickness = 1;
  
    // Pen color selection
    const colorPicker = document.getElementById('color-picker');
    colorPicker.addEventListener('input', (e) => {
      penColor = e.target.value;
      isErasing = false;
    });
  
    // Background color selection
    const backgroundPicker = document.getElementById('background-picker');
    backgroundPicker.addEventListener('input', (e) => {
      backgroundColor = e.target.value;
      canvas.style.backgroundColor = backgroundColor;
    });
  
    // Pen thickness selection
    const thicknessSelect = document.getElementById('thickness-select');
    thicknessSelect.addEventListener('change', (e) => {
      penThickness = parseInt(e.target.value);
    });
  
    // Eraser button
    const eraserButton = document.getElementById('eraser-button');
    eraserButton.addEventListener('click', () => {
      isErasing = true;
    });
  
    // Text tool
    const textButton = document.getElementById('text-button');
    const textInputContainer = document.getElementById('text-input-container');
    const textInput = document.getElementById('text-input');
    const textDrawButton = document.getElementById('text-draw-button');
  
    textButton.addEventListener('click', () => {
      textInputContainer.style.display = 'block';
      textInput.focus();
    });
  
    textDrawButton.addEventListener('click', () => {
      const text = textInput.value;
      if (text.trim() !== '') {
        const x = canvas.width / 2;
        const y = canvas.height / 2;
        ctx.font = '20px Arial';
        ctx.fillStyle = penColor;
        ctx.fillText(text, x, y);
      }
      textInput.value = '';
      textInputContainer.style.display = 'none';
    });
  
    // Calculator
    const calculatorButton = document.getElementById('calculator-button');
    const calculatorContainer = document.getElementById('calculator-container');
    const calculatorInput = document.getElementById('calculator-input');
    const calculatorButtons = document.getElementById('calculator-buttons');
    const calculatorClearButton = document.getElementById('calculator-clear');
  
    calculatorButton.addEventListener('click', () => {
      calculatorContainer.style.display = 'block';
      calculatorInput.value = '';
      calculatorInput.focus();
    });
  
    calculatorButtons.addEventListener('click', (e) => {
      if (e.target.matches('button')) {
        const buttonValue = e.target.textContent;
        calculatorInput.value += buttonValue;
      }
    });
  
    calculatorClearButton.addEventListener('click', () => {
      calculatorInput.value = '';
      calculatorInput.focus();
    });
  
    // Drawing functionality
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
  
    function startDrawing(e) {
      isDrawing = true;
      const x = e.clientX - canvas.getBoundingClientRect().left;
      const y = e.clientY - canvas.getBoundingClientRect().top;
      ctx.beginPath();
      ctx.moveTo(x, y);
      if (isErasing) {
        ctx.strokeStyle = backgroundColor;
      } else {
        ctx.strokeStyle = penColor;
      }
      ctx.lineWidth = penThickness;
    }
  
    function draw(e) {
      if (!isDrawing) return;
      const x = e.clientX - canvas.getBoundingClientRect().left;
      const y = e.clientY - canvas.getBoundingClientRect().top;
      ctx.lineTo(x, y);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }
  
    function stopDrawing() {
      isDrawing = false;
      ctx.closePath();
    }
  });
  