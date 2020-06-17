'use strict';

{
  // ボタン設定
  class Panel {
    constructor(){
      this.el = document.createElement('li');
      this.el.classList.add('pressed');
      this.el.addEventListener('click', () => {
        if(this.el.classList.contains('pressed')){
          return;
        }
        mask.classList.remove('hidden');
        modal.classList.remove('hidden');
        this.check();
      });
    }

    getEl() {
      return this.el;
    }

    check() {
      scoreCopy = 0;
      if(board.currentNumberRT() > parseInt(this.el.textContent, 10)||parseInt(this.el.textContent, 10) === 1) {
        currentNum = parseInt(this.el.textContent, 10) - 1;
        currentQ.textContent = `${currentNum + 1} - 1`;
        setQuiz();
      }
      else if(board.currentNumberRT() === parseInt(this.el.textContent, 10)){
        currentNum = board.currentNumberRT() - 1;
        currentQ.textContent = `${currentNum + 1} - 1`;
        setQuiz();
      }
      else {
        return;
      }
    }
  }

  class Board {
    constructor(){
      this.panels = [];
      for(let i = 0; i < 20; i++){
        this.panels.push(new Panel());
      }
      this.setup();
      this.NUM = 0;
    }

    setup() {
      const board = document.getElementById('board');
      this.panels.forEach((panel, index) => {
        board.appendChild(panel.getEl());
        panel.getEl().textContent = index + 1;
      });
    }

    activate(num) {
      this.panels.forEach((panel, index) => {
        if(num === index + 1){
          panel.getEl().classList.remove('pressed');
        }
      });
    }

    currentNumberRT() {
      return this.NUM;
    }

    numreturn(numn) {
      numn++;
      this.NUM = numn;
      this.activate(numn);
    }
  }

  const board = new Board();

  let currentNumber = 1;

  board.activate(currentNumber);

  const mask = document.getElementById('mask');
  const modal = document.getElementById('modal');

  // クイズ設定
  const question = document.getElementById('question'); 
  const choices = document.getElementById('choices'); 
  const btn = document.getElementById('btn'); 
  const result = document.getElementById('result');
  const lastScore = document.getElementById('lastScore');
  const lastComment = document.getElementById('lastComment')
  const homeBtn = document.getElementById('homeBtn');
  const currentQ = document.getElementById('currentQ');
  const text = document.getElementById('text');
  const correctAns = document.getElementById('correctAns');
  const comment = document.getElementById('comment');

  const quizSetlist = [
    /*1*/
  [{q: 'パソコンのパソは何の略？', c: ['パーソナル','パスワード','パッション']},{q: 'ドラミちゃんの好きな食べ物は?', c: ['メロンパン','どら焼き','プリン']},{q: 'テニスやバドミントンなどでチャンスボールをおもいっきり相手に打ち込むことをなんという？', c: ['スマッシュ','サービス','アタック']}],
  /*2*/
  [{q: '一年の内、一番昼の時間が長い日を何という?', c: ['夏至','冬至','白夜']},{q: '地球の成層圏で層をなし、紫外線をさえぎる働きをする物質は？', c: ['オゾン','フロン','メタン']},{q: '	パイとクリームを何重にも重ねて焼いたフランス風ケーキを何という？', c: ['ミルフィーユ','タルト','モンブラン']}],
  /*3*/
  [{q: 'ワープロのプロは何の略？', c: ['プロセッサ','プログラム','プロフェッショナル']},{q: '	栄養価が高く、消化の良いことから「海のミルク」と呼ばれている食べ物は？', c: ['カキ','チーズ','ホタテ']},{q: '天気予報などで気圧の単位として使われている単位は？', c: ['ヘクトパスカル','ヘンリー','モーメント']}],
  /*4*/
  [{q: '夏の大三角の1等星はデネブ、アルタイルとあと一つは何？', c: ['ベガ','メタ','パール']},{q: '２０００円札に描かれている肖像画は誰？', c: ['紫式部','聖徳太子','伊藤博文']},{q: '16世紀日本に初めて鉄砲が伝わったとされる島は', c: ['種子島','桜島','択捉島']}],
  /*5*/
  [{q: 'ダイナマイトを発明したことで知られる人物と言えば誰？', c: ['ノーベル','ダイナマイト','エジソン']},{q: 'バスケットボールのゴールの直径は何センチ？', c: ['45cm','60cm','40cm']},{q: 'ＳＭＡＰのＳはスポーツのＳ。ではＭは？', c: ['ミュージック','マックス','モーダル']}],
  /*6*/
  [{q: '1兆は英語で何という?', c: ['トリリオン','トリミリオン','ミリオン']},{q: 'B\'zの曲で正しいものはどれ?', c: ['憂いのGypsy','恋せよ乙女','僕が僕であるために']},{q: 'LANのAはなんの略?', c: ['エリア','アクセス','アカウント']}],
  /*7*/
  [{q: '空気中の音速はどれくらい?', c: ['約340m/s','約760m/s','約120m/s']},{q: '太陽の直径は地球の何倍?', c: ['約109倍','約24倍','約78倍']},{q: '将棋の盤は何×何?', c: ['9×9','8×8','10×10']}],
  /*8*/
  [{q: '安土桃山時代にポルトガル人やスペイン人は何と呼ばれた?', c: ['南蛮人','欧州人','外人']},{q: 'リンスの元の意味は?', c: ['ゆすぐ','きれいな','滑らかな']},{q: '織田信長が駿河の今川義元を破った戦いをなんという?', c: ['桶狭間の戦い','関ヶ原の戦い','応永の外寇']}],
  /*9*/
  [{q: '面積が二番目に小さい都道府県は?', c: ['大阪府','香川県','東京都']},{q: 'オーストラリアの首都は?', c: ['キャンベラ','シドニー','メルボルン']},{q: 'X線を発見した人物は?', c: ['レントゲン','アンリベクレル','ポール・ヴィラール']}],
  /*10*/
  [{q: '日本で二番目に高い山は?', c: ['北岳','槍ヶ岳','御嶽山']},{q: '光の三原色にない色は?', c: ['黄','青','赤']},{q: '世界で一番深い湖は?', c: ['バイカル湖','カスピ海','スペリオル湖']}],
  /*11*/
  [{q: '日本の最西端は?', c: ['与那国島','択捉島','沖ノ鳥島']},{q: '日本の国鳥は?', c: ['キジ','トキ','鶴']},{q: '.comのcomは何の略?', c: ['コマーシャル','コミュニティ','コミット']}],
  /*12*/
  [{q: '原子力発電に最も依存している国は?', c: ['フランス','ドイツ','イタリア']},{q: '光は1秒間で地球何周できるか?', c: ['7周半','4周半','2周']},{q: '日本一面積が大きいドームは?', c: ['ヤフードーム','東京ドーム','ナゴヤドーム']}],
  /*13*/
  [{q: '歴史上最大の地震は?', c: ['チリ地震','岩手・宮城内陸地震','華県地震']},{q: '集中治療室をアルファベットであらわすと?', c: ['ICU','IBM','CEO']},{q: 'チャンネルを頻繁に変えながらテレビを見ることを何という?', c: ['ザッピング','タッピング','リッピング']}],
  /*14*/
  [{q: '世界一大きい島は?', c: ['グリーンランド','デヴォン島','マニトゥーリン島']},{q: '国内でブドウの生産量3位の都道府県は?', c: ['山形県','長野県','山梨県']},{q: '国内の企業数は?', c: ['約420万社','約240万社','約670万社']}],
  /*15*/
  [{q: '4年に一度、40才以下の若手数学者へ贈られる、「数学界のノーベル賞」とも呼ばれる賞は何？', c: ['フィールズ賞','ファイズ賞','デッカード賞']},{q: '飛行機の中で食べれるように作られた野菜は?', c: ['ミニトマト','アボカド','きゅうり']},{q: '日本国憲法が施工されたのは何年?', c: ['1947年','1945年','1943年']}],
  /*16*/
  [{q: 'ピンクハウスはどの国の大統領官邸?', c: ['アルゼンチン','イタリア','フランス']},{q: 'アマゾン川で河口から上流へ向けて流れが逆流する現象を何という?', c: ['ポロロッカ','ナブナンダ','サブミラン']},{q: 'エレベーターでは一人当たりの体重を何キロとして定員数を決めている?', c: ['60kg','65kg','63kg']}],
  /*17*/
  [{q: '深海魚は何mより深い海にすむ魚?', c: ['200m','1000m','500m']},{q: '孫の孫は何という?', c: ['玄孫','昆孫','ひ孫']},{q: 'ト音記号はなんのアルファベットをかたどっている?', c: ['G','S','J']}],
  /*18*/
  [{q: '世界で最も面積が広い内陸国は?', c: ['カザフスタン','イラン','イラク']},{q: '日本唯一の砂漠である裏砂漠がある都道府県は?', c: ['東京都','鳥取県','島根県']},{q: '冷たいものを食べたときに頭が痛くなることを医学用語で何という?', c: ['アイスクリーム頭痛','干渉頭痛','アイスヘッド']}],
  /*19*/
  [{q: 'ジュースの空きカン5本を集めると、新品のジュース1本と交換してもらえる。いま、あなたは新品のジュースを200本もっている。さて、あなたは何本ジュースを飲めるだろうか？', c: ['249本','240本','200本']},{q: '幼女は深さ30メートルの井戸に落ちてしまった。幼女は1時間ごとに3メートル登るが、その直後に2メートルずり落ちてしまう。幼女が井戸から脱出するには何時間かかる？', c: ['28時間','30時間','27時間']},{q: '箱の中に、ボールが1つ入っている。ボールの色は、黒か白のどちらかである。この箱の中へ白いボールをひとつ追加して、箱をよく振ってボールを1つ取り出してみたところ、白だった。さて、箱の中に残ったボールが白である確率は？', c: ['66%','33%','50%']}],
  /*20*/
  [{q: '湖にスイレンの花が落ちた。スイレンは1分経つと2倍に増える。湖がスイレンでいっぱいになるのに48分かかる。では、スイレンが湖のちょうど半分になるのに何分かかるだろうか？', c: ['47分','49分','48分']},{q: '冷蔵庫のプリンが誰かに食べられてしまった。幼女Aは「犯人はBです」と発言した。幼女B,Cもある発言をした。その後、『犯人はABCのうち誰か1人』『犯人だけが発言で本当のことを言った』ということが分かっ  た。 犯人は誰？', c: ['C','A','B']},{q: '幼女A,Bがじゃんけんで10回勝負をした。Aは、グーを3回、チョキを6回、パーを1回出した。Bは、グーを2回、チョキを4回、パーを4回出した。あいこには一度もならなかった。2人が何の手をどの順番で出したかは分からない。さて、結果はどうなった？', c: ['幼女Aが勝った','幼女Bが勝った','引き分け']}],
  ];

  // https://sist8.com/logic 「幼女の論理クイズ」

  let currentNum = 0;
  let isAnswered;
  let score = 0;
  let curry = 0;
  let scoreCopy = 0;
 
  function shuffle(arr) {
   let i = arr.lengrh - 1;
   for(i = arr.length - 1; i > 0; i--) {
     const j = Math.floor(Math.random() * (i + 1));
     [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if(isAnswered){
      return;
    }
    isAnswered = true;

    text.classList.remove('hidden');

    if (li.textContent === quizSetlist[currentNum][curry].c[0]) {
      li.classList.add('correct');
      score++;
      comment.classList.add('correct');
      comment.textContent = `正解です!`;
    }
    else {
      li.classList.add('wrong');
      correctAns.classList.remove('correct');
      comment.classList.remove('correct');
      correctAns.textContent = '不正解です';
      comment.textContent = `正解は${quizSetlist[currentNum][curry].c[0]}です`;
    }
    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;
    question.textContent = quizSetlist[currentNum][curry].q;

    while(choices.firstChild){
      choices.removeChild(choices.firstChild);
    }
    
    const shuffledChoices = shuffle([...quizSetlist[currentNum][curry].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if(curry === quizSetlist[currentNum].length - 1){
      btn.textContent = '結果を表示';
    }
  }

  btn.addEventListener('click', () => {
    if(btn.classList.contains('disabled')){
      return;
    }
    text.classList.add('hidden');
    btn.classList.add('disabled');
    correctAns.textContent = '';
    comment.textContent = '';
    
    if(curry === quizSetlist[currentNum].length - 1){
      lastScore.textContent = `スコア: ${score} / ${quizSetlist[currentNum].length}`;
      if(score === 3){
        if(currentNum === 19){
          lastComment.textContent = 'すべての問題お疲れ様でした!';
        }
        else {
          lastComment.textContent = `ステージ${currentNum + 2}が解放されました!`;
        }
      }
      else {
        lastComment.textContent = `あと${3 - score}点でステージ${currentNum + 2}が解放`;
      }
      result.classList.remove('hidden');
      scoreCopy = score;
    }
    else {
      curry++;
      currentQ.textContent = `${currentNum + 1} - ${curry + 1}`;
      setQuiz();
    }
  });

  homeBtn.addEventListener('click', () => {
    curry = 0;
    score = 0;
    lastComment.textContent = '';
    mask.classList.add('hidden');
    modal.classList.add('hidden');
    btn.textContent = '次へ';
    result.classList.add('hidden');
    if(scoreCopy <= 2 || currentNum === 19){
      return;
    }
    board.numreturn(currentNum + 1);
  }); 
}