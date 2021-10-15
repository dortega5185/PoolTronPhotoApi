const { google } = require('googleapis')
const path = require('path')
const fs = require('fs')

const CLIENT_ID =
  '230611451736-cimii4e0u6trm9k5tv49fcob0s6nsme5.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'

const REFRESH_TOKEN =
  '1//049fWB2nHKGKjCgYIARAAGAQSNwF-L9IrFzMvt-sAdEYnxvgjOwlOFSDZeUkhFfjMZrcM3FYR6DRa7B1-ieywjCE_IJGHsbaETKE'

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
)

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
})

const filePath = path.join(__dirname, '/public/custom-concrete-pools/ccp11.jpg')

async function uploadFile() {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: 'ccp11.jpg',
        mimeType: 'image/jpg',
      },
      media: {
        mimeType: 'image/jpg',
        body: fs.createReadStream(filePath),
      },
    })
    console.log(response.data)
  } catch (error) {
    console.log(error.message)
  }
}

uploadFile()

async function deleteFile() {
  try {
    const response = await drive.files.delete({
      fileId: '1OatOcy0WLOQz7oVr1ZlM71vMUDbn5e-4',
    })
    console.log(response.data, response.status)
  } catch (error) {
    console.log(error.message)
  }
}

// deleteFile()

async function generatePublicUrl() {
  try {
    const fileId = '1hq1sLKbAIjxExoxQPJTjT0btitb1hKpQ'
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    })

    const result = await drive.files.get({
      fileId: fileId,
      fields: 'webViewLink, webContentLink',
    })
    console.log(result.data)
  } catch (error) {
    console.log(error.message)
  }
}

// generatePublicUrl()
