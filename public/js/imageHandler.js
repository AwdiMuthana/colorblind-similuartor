//Accept files from file input
const handleInput = (event) => {
  const { files } = event.target;
  readFile(files[0]);
};

//Read file in and produce a URL
function readFile(file) {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.addEventListener('load', () => {
    processImage(fileReader.result);
  });
}

function selectMatrix(blindnessType) {
  switch (blindnessType) {
    case 'protanopia':
      return protanopiaMatrix;
    case 'deuteranopia':
      return deuteranopiaMatrix;
    case 'tritanopia':
      return tritanopiaMatrix;
  }
}

//Perform matrix multiplication on the given image using the transformation matrix specified
function applyColorBlindnessFilter(imageData, matrix) {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const newR = r * matrix[0][0] + g * matrix[0][1] + b * matrix[0][2];
    const newG = r * matrix[1][0] + g * matrix[1][1] + b * matrix[1][2];
    const newB = r * matrix[2][0] + g * matrix[2][1] + b * matrix[2][2];

    data[i] = Math.min(255, Math.max(0, newR));
    data[i + 1] = Math.min(255, Math.max(0, newG));
    data[i + 2] = Math.min(255, Math.max(0, newB));
  }
  return imageData;
}

//Apply image filter and draw to screen
function processImage(src, blindnessType, severity) {
  //Select the necessary matrix
  const matrix = selectMatrix(blindnessType);

  //Access the canvas element and load the image
  const canvas = document.getElementById('canvas');
  canvas.hidden = false;
  const context = canvas.getContext('2d');
  //second canvas to store unmodified image
  const canvas2 = document.getElementById('original_image');
  const context2 = canvas2.getContext('2d');

  const img = new Image();
  img.src = src;

  img.onload = function () {
    //Match canvas size to image size
    const ratio = img.width / img.height;
    img.height = Math.min(800, img.height);
    img.width = img.height * ratio;
    canvas.height = img.height;
    canvas.width = img.width;
    console.log(canvas.width, canvas.height);
    //Apply filter to image
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    context2.drawImage(img, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    //We only attempt to apply filter if necessary
    if (matrix) {
      const processedImageData = applyColorBlindnessFilter(
        imageData,
        matrix(severity)
      );
      context.putImageData(processedImageData, 0, 0);
    } else {
      context.putImageData(imageData, 0, 0);
    }
  };
}

function handleFilterChange(colorBlindnessType) {
  //Get user-input values to change the filter
  const form = document.getElementById('colorBlindnessType');
  const severity = form.colorBlindnessSeverity.value;
  const blindnessType = colorBlindnessType || form.colorBlindnessType.value;

  //change the filter
  changeColorBlindnessFilter(blindnessType, severity);
}

function changeColorBlindnessFilter(blindnessType, severity) {
  //Select the necessary matrix
  const matrix = selectMatrix(blindnessType);

  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const canvas2 = document.getElementById('original_image');
  const context2 = canvas2.getContext('2d');
  //Get original image from second canvas
  const imageData = context2.getImageData(0, 0, canvas.width, canvas.height);

  //Draw image to screen
  if (matrix) {
    //Apply filtered image to existing canvas
    const processedImageData = applyColorBlindnessFilter(
      imageData,
      matrix(Number(severity))
    );
    context.putImageData(processedImageData, 0, 0);
  } else {
    context.putImageData(imageData, 0, 0);
  }
}
