const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let my_num = 0;
  let judgement='';

  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  if( hand == 'グー') my_num = 4;
  else if( hand == 'チョキ') my_num = 5;
  else if( hand == 'パー') my_num = 6;
  let num_diff=my_num-num;
  if (num_diff%3==0) judgement='引き分け';
  else if(num_diff%3==1) judgement='負け';
  else {
    judgement='勝ち';
    win += 1;
  }
  total += 1;
  
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/coin", (req, res) => {
  let correct = Number( req.query.correct );
  let total = Number( req.query.total );
  const num = Math.floor( Math.random() * 2 + 1 );
  let result = '';
  let judgement='';

  if( num==1 ) result = '表';
  else result = '裏';
  if( req.query.omote ) ans = '表';
  else ans = '裏';

  if( result==ans ){
    judgement='正解';
    correct+=1
  }else judgement='不正解';
  total += 1;
  
  const display = {
    ans: ans,
    result: result,
    judgement: judgement,
    correct: correct,
    total: total
  }
  res.render( 'coin', display );
});

app.get("/quiz", (req, res) => {
  let total = Number( req.query.total )+1;
  let num=0;
  let correct=0;
  if( req.query.vege1 ) {
    num+=1;
    correct+=1;
  }
  if( req.query.vege2 ) {
    num+=1;
  }
  if( req.query.vege3 ) {
    num+=1;
    correct+=1;
  }
  if( req.query.vege4 ) {
    num+=1;
    correct+=1;
  }
  if( req.query.vege5 ) {
    num+=1;
  }
  if( req.query.vege6 ) {
    num+=1;
    correct+=1;
  }
  const display = {
    total: total,
    num: num,
    correct: correct
  }
  res.render('quiz', display);
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
