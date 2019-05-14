const procForm = {}

const convert_rbody2procForm = rbody => Object.keys(rbody)
  .reduce((a, c, i, ar) => {
      if (c === "target_url") {
        a.target_url = rbody[c];
        return a;
      }
      let nr = c.split('_')[1];
      if(a.tmp.hasOwnProperty(nr)){
        a.tmp[nr][c.split('_')[0]] = rbody[c];
      }else{
        a.tmp[nr]={[c.split('_')[0]]:rbody[c]};
      }
      if (i === ar.length - 1) {
        Object.keys(a.tmp)
          .forEach(anr => {
              a.actions.push(
                Object.assign({actionNr: anr}, a.tmp[anr])
              );
              delete a.tmp[anr];
          })
      delete a.tmp;
      // a.action.sort((a,b)=>a.actionNr-b.actionNr));
    }
    return a;
  },
  {target_url: "", actions: [], tmp: {} });


const shrink_procForm=procForm=>Object({
  t: procForm.target_url,
  a: procForm.actions.map(act=>Object.assign({
    n:act.actionNr,
    a:act.actionSel,
    c:act.cssQuery
  },
  (act.furtherInput?{f:act.furtherInput}:{})
  ))
});

const unshrink_procForm=procForm=>Object({
  target_url:procForm.t,
  actions: procForm.a.map(act=>Object.assign({
    actionNr:act.n,
    actionSel:act.a,
    cssQuery:act.c
  },
  (act.f?{furtherInput:act.f}:{})
  ))
});

procForm.convert2procForm=convert_rbody2procForm;
procForm.shrink=shrink_procForm;
procForm.unshrink=unshrink_procForm;

module.exports = procForm;
