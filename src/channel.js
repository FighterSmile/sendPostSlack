const dotenv = require('dotenv')
dotenv.config()
const { GoogleSpreadsheet } = require('google-spreadsheet');

const DOC_ID = process.env.DOC_ID;

async function accessSpreadsheet(){
  const doc = new GoogleSpreadsheet(DOC_ID)
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  })

  await doc.loadInfo();
  const sheet = doc.sheetsByTitle['POST_MESSAGE']
  
  const rows = await sheet.getRows({
    
  });
  const result = []


  rows.forEach(row =>{
    result.push(row._rawData)
  })
  
  return result
}

// accessSpreadsheet()

module.exports = {accessSpreadsheet}

