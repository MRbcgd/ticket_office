var fs=require('fs')
var http=require('http')
var express=require('express')
var socketio=require('socket.io')

var seats=[
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
  fs.readFile('HTMLPage.html',function(erorr,data){
    if(error){
      return console.log(error);
    }

    res.send(data.toString())
  })
})
app.get('/seats',function(req,res,next){
  console.log(seats+'send');
  res.send(seats)
})
server.listen(52273,function(){
  console.log('Server running at http://127.0.0.1:52273');
})
var io=socketio.listen(server)
io.sockets.on('connection',function(socket){
  socket.on('reserve',function(data){
    seats[data.y][data.x]=2
    io.sockets.emit('reserve',data)
  })
})
