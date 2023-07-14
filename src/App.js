import { useState } from 'react';
import './App.css';
import { empresas } from './empresas';

function App() {
  const [status, setStatus] = useState("");
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");

  const modelInitialDate = initialDate + " 00:00:00 GMT-3";
  const modelFinalDate = finalDate + " 00:00:00 GMT-3";
  const initialDateCalc = Date.parse(modelInitialDate);
  const finalDateCalc = Date.parse(modelFinalDate);

  const filteredCompanies = empresas.filter(empresa => {

    if (initialDate || finalDate) {
      const modelCompanyDate = empresa.dataInclusao.split("/").reverse().join("-") + " 00:00:00 GMT-3";
      var companyDate = Date.parse(modelCompanyDate);
    }

    if (status && initialDate && finalDate) {
      return (empresa.statusEmpresa === status && companyDate >= initialDateCalc && companyDate <= finalDateCalc)
    }

    if (initialDate && finalDate) {
      return (companyDate >= initialDateCalc && companyDate <= finalDateCalc)
    }

    if (status && initialDate) {
      return (empresa.statusEmpresa === status && companyDate >= initialDateCalc)
    }

    if (status && finalDate) {
      return (empresa.statusEmpresa === status && companyDate <= finalDateCalc)
    }

    if (initialDate) {
      return (companyDate >= initialDateCalc)
    }

    if (finalDate) {
      return (companyDate <= finalDateCalc)
    }

    if (status) {
      return empresa.statusEmpresa === status
    }

    return true;
  })

  return (
    <div className="App">
      <label for='status'>Status da empresa</label>
      <select id='status' onChange={(e) => setStatus(e.target.value)}>
        <option value="">Todas</option>
        <option value="ativa">Ativas</option>
        <option value="inativa">Inativas</option>
      </select>

      <label for='initialDate'>Data inicial</label>
      <input type='date' id='initialDate' value={initialDate} onChange={e => {setInitialDate(e.target.value)}}></input>
      <label for='finalDate'>Data final</label>
      <input type='date' id='finalDate' value={finalDate} onChange={e => {setFinalDate(e.target.value)}}></input>

      <table>
        <thead>
          <tr>
            <th>Lista de empresas</th>
          </tr>
          <tr>
            <th scope='col'>CNPJ</th>
            <th scope='col'>Razão social</th>
            <th scope='col'>Responsável</th>
            <th scope='col'>Telefone</th>
            <th scope='col'>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompanies.map(empresa => <TableData empresa={empresa} key={empresa.codigo}/>)}
        </tbody>
      </table>
    </div>
  );
}

function TableData({empresa}) {
  let statusEmpresa = "ativa";
  if (empresa.statusEmpresa === "inativa") {
    statusEmpresa = "inativa";
  }

  return (
    <tr className={statusEmpresa}>
      <td>{empresa.cnpj}</td>
      <td>{empresa.razaoSocial}</td>
      <td>{empresa.responsavelLegal}</td>
      <td>{empresa.telefoneContato}</td>
      <td>{empresa.email}</td>
    </tr>
  )
}

export default App;
