const API_URL = 'http://192.168.88.225:8000/predict';

export const uploadAudio = async (audioUri) => {
  try {
    console.log('Uploading audio file:', audioUri);
    
    const formData = new FormData();
    formData.append('audio', {
      uri: audioUri,
      type: 'audio/m4a',
      name: 'recording.m4a'
    });

    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Upload successful:', data);
    return data;
  } catch (error) {
    console.error('Error uploading audio:', error);
    throw error;
  }
}; 