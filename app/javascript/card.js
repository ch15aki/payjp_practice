const pay = () => {
  // 環境変数で読み込み
  Payjp.setPublicKey(process.env.PAYJP_PUBLIC_KEY);　// PAY.JPテスト公開鍵
  // charge-formに入力されてsubmitを押すとイベント発火
  const form = document.getElementById("charge-form");
  form.addEventListener("submit", (e) => {
    // コントローラーの処理を止めてjsを実行する
    e.preventDefault();

    const formResult = document.getElementById("charge-form");
    const formData = new FormData(formResult);

    // カードの情報
    const card = {
      number: formData.get("number"),
      cvc: formData.get("cvc"),
      exp_month: formData.get("exp_month"),
      exp_year: `20${formData.get("exp_year")}`,
    };
    // console.log(card) 

    // 実際にトークンを生成するコード
    Payjp.createToken(card, (status, response) => {
      // HTTPレスポンスが正常
      if (status === 200) {
        // console.log(response) 中身がトークンになっている

        // responseのid（トークン）のみの情報を取得
        const token = response.id;

        // トークンをコントローラーに送る
        const renderDom = document.getElementById("charge-form");
        // inputタグの中身をトークンにして、hiddenにして送る
        const tokenObj = `<input value=${token} type="hidden" name='token'>`;
        renderDom.insertAdjacentHTML("beforeend", tokenObj);

        // name属性をなくして、コントローラーに送らないようにする
        document.getElementById("number").removeAttribute("name");
        document.getElementById("cvc").removeAttribute("name");
        document.getElementById("exp_month").removeAttribute("name");
        document.getElementById("exp_year").removeAttribute("name");

        // e.preventDefault();で止めていた処理を実行する
        document.getElementById("charge-form").submit();
        // formの中身を空にする
        document.getElementById("charge-form").reset();
      } else {
      }
    });
  });
};

window.addEventListener("load", pay);