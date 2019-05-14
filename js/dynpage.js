const genRowInner=nr=>`
  <td class="orderNr">${nr}</td>
  <td class="actionSel">
    <select class="" name="actionSel_${nr}" onchange="inputChangeBySelection(this)">
      <option value="type">${document.querySelector('p.sel1').innerText}</option>
      <option value="click">${document.querySelector('p.sel2').innerText}</option>
    </select>
  </td>
  <td class="cssQuery">
    <input type="text" name="cssQuery_${nr}" value="">
  </td>
  <td class="furtherInput">
    <input type="text" name="furtherInput_${nr}" value="">
  </td>
  <td><button type="button" onclick="delRow(this.parentNode.parentNode)">x</button></td>
`;
const refreshOrder=()=>[...document.querySelectorAll('td.orderNr')].forEach((e,i,ar)=>{
  e.innerText=i+1;
  let tr = e.parentNode;
  tr.querySelector('td.actionSel select').name=`actionSel_${i+1}`;
  tr.querySelector('td.cssQuery input').name=`cssQuery_${i+1}`;
  tr.querySelector('td.furtherInput input').name=`furtherInput_${i+1}`;
});
const addActionRow=r=>{
  let nrow = document.createElement('tr');
  nrow.innerHTML=genRowInner(document.querySelectorAll('td.orderNr').length+1);
  r.parentNode.parentNode.insertBefore(nrow,r.parentNode);
  refreshOrder();
}
const inputChangeBySelection=r=>r.parentNode.parentNode.querySelector('td.furtherInput input').hidden=(r.value==="click");
const delRow=r=>{r.parentNode.removeChild(r);refreshOrder();}
