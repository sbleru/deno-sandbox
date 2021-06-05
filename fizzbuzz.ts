// --- サーバーを起動 --- (*1)
// モジュールを取り込む
import { serve } from "https://deno.land/std/http/server.ts";
const s = serve({ port: 8080 }); // Webサーバーを起動
console.log("http://localhost:8080/");
for await (const req of s) { // クライアントの接続を待ち受ける
  req.respond({
    headers: new Headers({"content-type": "text/html"}),
    body: getFizzBuzz(100) }); // FizzBuzzの結果を返す
}

// --- FizzBuzzを返す --- (*2)
function getFizzBuzz(max:Number):string {
  const setStyle = (s:string, color:string) => 
    `<div style="background-color:${color};">${s}</div>`;
  const result = []
  for (let i = 1; i <= max; i++) {
    const isFizz = () => i % 3 == 0; // Fizzを判定
    const isBuzz = () => i % 5 == 0; // Buzzを判定
    const isFizzBuzz = () => isFizz() && isBuzz()
    result.push( // FizzBuzzの条件演算子で順次判定
      isFizzBuzz() ? setStyle("FizzBuzz", "#fcf")
        : isFizz() ? setStyle("Fizz", "#fcc")
        : isBuzz() ? setStyle("Buzz", "#ccf")
        : setStyle(String(i), "#eee"));
  }
  return `<div style="text-align:center">` + 
    result.join("") + '</div>';
}