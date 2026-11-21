// Direct official listings verified November 2026; metrics retain the profile snapshot.
const play = id => `https://play.google.com/store/apps/details?id=${id}`
const apple = id => `https://apps.apple.com/app/id${id}`
export const PRODUCT_PREVIEW_COPY = {
  'copy-text-on-screen': {
    headline: 'Copy text from screenshots.',
    description: 'Share a screenshot, select the text area, then copy, save or translate the extracted text.',
  },
  'ai-text-scanner': {
    headline: 'Scan documents. Extract text.',
    description: 'Extract text from photos, PDFs and handwriting. Scan documents to PDF, or ask AI to summarize and translate.',
  },
  'ai-transcript-audio-to-text': {
    headline: 'Transcribe audio and video.',
    description: 'Record speech or import audio and video. Create transcripts, generate summaries and ask questions about the content.',
  },
}
export const PRODUCT_LISTINGS = {
  'copy-text-on-screen': { play: play('com.copy.paste.ocr.screen.text.copy.text.on.screen'), apple: apple('1330207906'), downloads: '500K+', ratings: '4.8K', rating: '4.6', ratingStore: 'App Store', category: 'Screen & image OCR', accent: 'green' },
  'ai-text-scanner': { play: play('com.offline.ocr.english.image.to.text.scanner'), apple: apple('1225032527'), downloads: '100K+', ratings: '9.2K', rating: '4.6', ratingStore: 'App Store', category: 'Documents & AI', accent: 'indigo' },
  'ai-transcript-audio-to-text': { play: play('com.appzys.aitranscribe'), apple: apple('6755148200'), downloads: '10K+', ratings: '412', rating: '4.6', ratingStore: 'Google Play', category: 'Audio & video to text', accent: 'blue' },
  'handwriting-to-text-scanner': { play: play('com.appzys.handwriting.ocr.handyscan'), apple: apple('6752295481') },
  'live-transcribe': { play: play('com.appzys.live.transcribe') },
  'ai-study-tutor': { play: play('com.appzys.pdfchat_aichatwithpdf') },
}
