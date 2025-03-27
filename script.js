const canvas = document.getElementById("jogoCanvas")
const ctx = canvas.getContext('2d')
let gravidade = 1  
let gameOver = false



document.addEventListener('keypress' , (evento) => {
    if (evento.code == 'Space' && personagem.pulando == false){
        console.log('taste', evento.code)
        personagem.velocidade_y = 15
        personagem.pulando = true
    }
})

document.addEventListener('click',(evento) =>{
    if(gameOver == true){
        location.reload()
    }
})
let obstaculo = {
    x:700,
    y:350,
    largura:30,
    altura:100,
    velocidade_x: 5
 
   
}

const personagem = {
    x:40,
    y:350,
    largura:30,
    altura:50,
    velocidade_y:0,
    pulando: false,
    imagem: new Image()
}
personagem.imagem.src='./static/penitente.png'
function desenharPersonagem(){
   ctx.drawImage(personagem.imagem,personagem.x,personagem.y,personagem.largura,personagem.altura)
    //  ctx.fillStyle ='red'  //cor
    // ctx.fillRect(personagem.x,personagem.y,personagem.largura,personagem.altura)
   
}

function atualizarPersonagem(){
    if (personagem.pulando){
   personagem.y -= personagem.velocidade_y
   personagem.velocidade_y -= gravidade
   if (personagem.y >= canvas.height - 50){
    personagem.velocidade_y = 0
    personagem.y = canvas.height - 50
    personagem.pulando = false
}

}
}

function desenharObstaculo(){
    ctx.fillStyle ='white'  //cor
    ctx.fillRect(
    obstaculo.x,
    obstaculo.y,
    obstaculo.largura,
    obstaculo.altura)

}
function atualizarObstaculo () {
    obstaculo.x -= obstaculo.velocidade_x
    if (obstaculo.x <= 0-obstaculo.largura){
        obstaculo.x = canvas.width
        obstaculo.velocidade_x += 1 
        //gerar valor randomizado
        let nova_altura = Math.random() * (100-70) + 70
        obstaculo.altura = nova_altura
        obstaculo.y = canvas.height - nova_altura
    }
}

function verificaColisao(){
   if (obstaculo.x < personagem.x + personagem.largura &&
    obstaculo.largura + obstaculo.x > personagem.x &&
    personagem.y < obstaculo.y + obstaculo.altura &&
    personagem.y + personagem.altura > obstaculo.y
){
        obstaculo.velocidade_x= 0
        personagem.velocidade_y = 0
        ctx.fillStyle = 'white'
        ctx.font = '50px Arial'
        ctx.fillText('GAME OVER', 50,100)
        gameOver = true
    }

}


function loop (){
    if(gameOver == false){
    ctx.clearRect(0,0,canvas.width,canvas.height)//apagar
    desenharPersonagem()//desenhar
    atualizarPersonagem()//atualizar
    desenharObstaculo()//desenhar obstaculo
    atualizarObstaculo()//atualizar obstaculo
    verificaColisao()
}
    requestAnimationFrame(loop)//reiniciar loop
}
loop()