const child = require('child_process');


const startAutoProcessInstance=procForm=>{
  child.fork('./autoProcessInstance.js',
    ['-t',procForm.t, '-a', procForm.a.reduce((a,c,i,ar)=>[
      ...a,
      Object.keys(c).filter(v=>v!=='n').map(v=>c.n+'<>'+v+'<>'+c[v])
    ],[])]
  )
}


module.exports={
  startAutoProcess: startAutoProcessInstance
}
