const API_URL = 'http://91.107.183.183:8000';

export const uploadAudio = async (audioUri, language) => {
  try {
    console.log('=== Upload Process Started ===');
    console.log('Audio URI:', audioUri);
    console.log('Selected Language:', language);

    const formData = new FormData();
    formData.append('file', {
      uri: audioUri,
      type: 'audio/m4a',
      name: 'recording.m4a'
    });
    formData.append('language', language); // Adding language parameter

    console.log('FormData created:', formData);
    console.log('Sending request to:', `${API_URL}/cat)`);

    const response = await fetch(`${API_URL}/cat`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Server Response Status:', response.status);
    console.log('Response Headers:', response.headers);

    if (!response.ok) {
      const errorData = await response.json();
      // console.error('Server Error Details:', errorData);
      // throw new Error(`Upload failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Server Response Data:', data);
    console.log('=== Upload Process Completed ===');
    return data;
  } catch (error) {
    // console.error('=== Upload Error ===');
    // console.error('Error Type:', error.name);
    // console.error('Error Message:', error.message);
    // console.error('Full Error:', error);
    throw error;
  }
};