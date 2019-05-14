const Nightmare = require('nightmare');
const profor = require('./processFormat.js');
const nightmareDefSettings = {
  show: true,
  height:900,
  width:1900,
  waitTimeout:120000,
  loadTimeout:120000,
  executionTimeout:120000
}

const args2execProcInfo=()=>process.argv
.reduce((a,c,i,ar)=>{
  if(c==='-t'){
      a.t=ar[i+1];
  }

  if(c === '-a'){
    ar[i+1].split(',')
    .forEach(info=>{
      let vals = info.split('<>');

      if(a.tmp.hasOwnProperty(vals[0])){
        a.tmp[vals[0]][vals[1]]=vals[2];
      }else{
        a.tmp[vals[0]]=Object({[vals[1]]:vals[2]});
      }
    })
  }
  if(i===ar.length-1){
    a.a=Object.keys(a.tmp).map(k=>Object.assign({n:k},a.tmp[k]));
    delete a.tmp;
  }
  return a;

},{t:"",a:[],tmp:{}})



const openPage = exob => new Promise((resolve,reject)=>{
  exob.night.goto(exob.execInfo.target_url)
  .wait('body')
  .then(()=>{
    resolve(exob);
  }).catch(err=>{
    console.log("ERROR opening page and waiting for 8s");
    console.error(err);
  })
}).catch(err=>{
  console.log("Error opening the page");
  console.error(err);
});


const execProcess=exob=>openPage(exob)
  .then(exob=>{
    exob.execInfo.actions.forEach(act=>{
      if(act.actionSel==='type'){
        exob.night.type(act.cssQuery,act.furtherInput)
      }else{
        exob.night.click(act.cssQuery)
      }
      exob.night.wait(5000)
    });
    exob.night
    .wait(90000)
    .evaluate(()=>[...document.querySelectorAll('*')].join('|||'))
    .end()
    .then(e=>{
      console.log(e.length);
      process.exit(0);
    })
    .catch(err=>{
      console.log("Error executing the actions");
      console.error(err)
    })
})


const appEntryPoint=()=>{
  console.log(profor.unshrink(args2execProcInfo()));
  execProcess({
    execInfo:profor.unshrink(args2execProcInfo()),
    night: new Nightmare(nightmareDefSettings)
  });
}


appEntryPoint();
