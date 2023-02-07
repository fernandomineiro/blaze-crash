var http = require("http");
const axios = require("axios");
const BLAZE_HISTORY =
  "https://api-v2.blaze.com/crash_games/recent/history?page=1";


http
  .createServer(async function (req, res) {
    let result = [];
    for (let i = 1; i <= 1; i++) {
      let uri = "https://api-v2.blaze.com/crash_games/recent";
      let r = await axios.get(uri);
      result = [...result, ...r.data];
    }
    console.log(result.length);
    let more13 = result.filter((x) => x.crash_point >= 1.3);
    let more14 = result.filter((x) => x.crash_point >= 1.4);
    let more15 = result.filter((x) => x.crash_point >= 1.5);
    let more16 = result.filter((x) => x.crash_point >= 1.6);
    let more17 = result.filter((x) => x.crash_point >= 1.7);
    let more20 = result.filter((x) => x.crash_point >= 2);
    let response = {
      more_1_3: (more13.length / result.length) * 100,
      more_1_4: (more14.length / result.length) * 100,
      more_1_5: (more15.length / result.length) * 100,
      more_1_6: (more16.length / result.length) * 100,
      more_1_7: (more17.length / result.length) * 100,
      more_2_0: (more20.length / result.length) * 100
    };
    res.write(JSON.stringify(response));
    let snapshot = [];
    const carteira_inicial = 100;
    const aposta = carteira_inicial * 0.05;
    let carteira = {
      carteira13: carteira_inicial,
      carteira14: carteira_inicial,
      carteira15: carteira_inicial,
      carteira16: carteira_inicial,
      carteira17: carteira_inicial,
      carteira18: carteira_inicial,
      carteira19: carteira_inicial,
      carteira20: carteira_inicial,
      carteira50: carteira_inicial
    };
    result.forEach((x) => {
      if (carteira.carteira13 - aposta >= 0)
        if (x.crash_point >= 1.3)
          carteira.carteira13 = carteira.carteira13 + aposta * 0.3;
        else carteira.carteira13 = carteira.carteira13 - aposta;

      if (carteira.carteira14 - aposta >= 0)
        if (x.crash_point >= 1.4)
          carteira.carteira14 = carteira.carteira14 + aposta * 0.4;
        else carteira.carteira14 = carteira.carteira14 - aposta;

      if (carteira.carteira15 - aposta >= 0)
        if (x.crash_point >= 1.5)
          carteira.carteira15 = carteira.carteira15 + aposta * 0.5;
        else carteira.carteira15 = carteira.carteira15 - aposta;

      if (carteira.carteira16 - aposta >= 0)
        if (x.crash_point >= 1.6)
          carteira.carteira16 = carteira.carteira16 + aposta * 0.6;
        else carteira.carteira16 = carteira.carteira16 - aposta;

      if (carteira.carteira17 - aposta >= 0)
        if (x.crash_point >= 1.7)
          carteira.carteira17 = carteira.carteira17 + aposta * 0.7;
        else carteira.carteira17 = carteira.carteira17 - aposta;

      if (carteira.carteira18 - aposta >= 0)
        if (x.crash_point >= 1.8)
          carteira.carteira18 = carteira.carteira18 + aposta * 0.8;
        else carteira.carteira18 = carteira.carteira18 - aposta;

      if (carteira.carteira19 - aposta >= 0)
        if (x.crash_point >= 1.9)
          carteira.carteira19 = carteira.carteira19 + aposta * 0.9;
        else carteira.carteira19 = carteira.carteira19 - aposta;

      if (carteira.carteira20 - aposta >= 0)
        if (x.crash_point >= 2.0)
          carteira.carteira20 = carteira.carteira20 + aposta * 1;
        else carteira.carteira20 = carteira.carteira20 - aposta;

      if (carteira.carteira50 - aposta >= 0)
        if (x.crash_point >= 5.0)
          carteira.carteira50 = carteira.carteira50 + aposta * 5;
        else carteira.carteira50 = carteira.carteira50 - aposta;
      snapshot.push({ ...carteira });
    });
    res.write(JSON.stringify(carteira));
    console.log(result.map((x) => JSON.stringify(x.crash_point)));
    res.end(); 
  })
  .listen(5555);
