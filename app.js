var fs=require('fs')
var http=require('http')
var express=require('express')
var socketio=require('socket.io')

var seats=[//0 : 빈공간, 1 : 예약가능, 2 : 예약불가능
  [1,1,0,1,1,0,0,0,0,1,1,0,1,1],
  [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
  [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
  [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
  [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
  [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
  [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
  [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
  [1,1,0,1,1,1,1,1,1,1,1,0,1,1]
]

var app=express()
var server=http.createServer(app)

app.get('/',function(req,res,next){
  fs.readFile('HTMLPage.html',function(error,data){
    if(error){
      return console.log(error);
    }

    res.send(data.toString())//JSON 타입으로 전송
  })
})
app.get('/seats',function(req,res,next){
  res.send(seats)
})
server.listen(52273,function(){
  console.log('Server running at http://127.0.0.1:52273');
})

var io=socketio.listen(server)
io.sockets.on('connection',function(socket){
  socket.on('reserve',function(data){
    seats[data.y][data.x]=2//server의 seat data 수정
    io.sockets.emit('reserve',data)
  })
  socket.on('cancel',function(data){
    seats[data.y][data.x]=1//server의 seat data 수정
    io.sockets.emit('cancel',data)
  })
})
