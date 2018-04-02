function createShader(context, type, source){
    var shader = context.createShader(type);
    context.shaderSource(shader, source);
    context.compileShader(shader);
    // TODO handle errors
    return shader;
}