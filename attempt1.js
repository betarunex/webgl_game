// assume vertexShaderSource and fragmentShaderSource are imported already.

var canvas = document.getElementById("attempt1Canvas");
var gl = canvas.getContext("webgl2");

function createShader(gl, type, source){
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    // TODO handle errors
    return shader;
}

var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

function createShaderProgram(gl, vertexShader, fragmentShader){
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    // TODO handle failure
    return shaderProgram;
}

// create the shader program on the GPU
var shaderProgram = createShaderProgram(gl, vertexShader, fragmentShader);

var positionAttrib = gl.getAttribLocation(shaderProgram, "a_position"); // attribute not uniform

var positionBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);

var positions = [
    0,0,
    0,0.5,
    0.4,0
];

gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(positions), gl.STATIC_DRAW);

var vao = gl.createVertexArray();

gl.bindVertexArray(vao);

gl.enableVertexAttribArray(positionAttrib);

var iterationSize = 2;
var dataType = gl.FLOAT;
var normalize = false;
var stride = 0;
var dataOffset = 0;
gl.vertexAttribPointer(positionAttrib,iterationSize,dataType,normalize,stride,dataOffset);
// binds current ARRAY_BUFFER to attrib (positionAttrib)

gl.viewport(0,0,canvas.getAttribute("width"),canvas.getAttribute("height"));


gl.clearColor(0,0,0,0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.useProgram(shaderProgram);

gl.bindVertexArray(vao);

var primitiveType = gl.TRIANGLES;
var offset = 0;
var count = 3;
gl.drawArrays(primitiveType,offset,count);

