const colorInput = document.getElementById('color')
const schemeSelected = document.getElementById('scheme')
const btn = document.getElementById('btn')

const colorText1 = document.getElementById('color-text-1')
const colorText2 = document.getElementById('color-text-2')
const colorText3 = document.getElementById('color-text-3')
const colorText4 = document.getElementById('color-text-4')
const colorText5 = document.getElementById('color-text-5')

const color1 = document.getElementById('color-1')
const color2 = document.getElementById('color-2')
const color3 = document.getElementById('color-3')
const color4 = document.getElementById('color-4')
const color5 = document.getElementById('color-5')

let colorData = []
let schemeData = []

btn.addEventListener('click', fetchColorScheme)
schemeSelected.addEventListener('change', fetchColorScheme)

function fetchColorScheme(){
    const colorSelect = colorInput.value.substring(1) 
    const schemeSelect = schemeSelected.value
    const url = `https://www.thecolorapi.com/scheme?hex=${colorSelect}&mode=${schemeSelect}` 

    fetch(url)
        .then (res => res.json())
        .then((data) => {
            schemeData = data
            reRenderScheme(data)
            console.log(schemeData)
        })
}


function reRenderScheme(data){
    const colorElements = [ 
        {element: color1, textElement: colorText1},
        {element: color2, textElement: colorText2},
        {element: color3, textElement: colorText3},
        {element: color4, textElement: colorText4},
        {element: color5, textElement: colorText5}
    ] 

        data.colors.slice(0,5).forEach((color, index) => {
            const {element, textElement} = colorElements[index]
            element.style.backgroundColor = color.hex.value
            textElement.textContent = color.hex.value

            if (isColorBetween(color.hex.value, "#000000", "#777777")){
                textElement.style.color = 'white'
            }
            else if (isColorBetween(color.hex.value, "#888888", "#FFFFFF")){
                textElement.style.color = 'black'
            }
        })
}

function renderColors(){
    const colorElements = [ 
        {element: color1, textElement: colorText1},
        {element: color2, textElement: colorText2},
        {element: color3, textElement: colorText3},
        {element: color4, textElement: colorText4},
        {element: color5, textElement: colorText5}
    ]

        colorData.colors.slice(0,5).forEach((color, index) => {
            const {element, textElement} = colorElements[index]
            element.style.backgroundColor = color.hex.value
            textElement.textcontent = color.hex.value

            if (isColorBetween(color.hex.value, "#000000", "#777777")){
                textElement.style.color = 'white'
            }
            else if (isColorBetween(color.hex.value, "#888888", "#FFFFFF")){
                textElement.style.color = 'black'
            }
        })
}


function isColorBetween(hexColor, lowerHex, upperHex) {
    const luminance = getLuminance(hexColor);
    const lowerLuminance = getLuminance(lowerHex);
    const upperLuminance = getLuminance(upperHex);

    return luminance >= lowerLuminance && luminance <= upperLuminance;
}

function getLuminance(hexColor) {
    const r = parseInt(hexColor.substring(1, 3), 16) / 255;
    const g = parseInt(hexColor.substring(3, 5), 16) / 255;
    const b = parseInt(hexColor.substring(5, 7), 16) / 255;

    return 0.2126 * adjustGamma(r) + 0.7152 * adjustGamma(g) + 0.0722 * adjustGamma(b);
}

function adjustGamma(value) {
    return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
}
