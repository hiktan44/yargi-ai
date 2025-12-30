Deno.serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Max-Age': '86400',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { text, voiceId = 'alloy' } = await req.json();

    if (!text || text.trim() === '') {
      throw new Error('Metin gereklidir');
    }

    // OpenAI API key kontrolü
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!openaiApiKey) {
      // API key yoksa fallback JSON yanıtı dön (frontend native TTS kullanacak)
      return new Response(JSON.stringify({
        success: false,
        useNativeTTS: true,
        message: 'OpenAI API key bulunamadı, native TTS kullanılacak',
        text: text
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Metni temizle ve optimize et
    const cleanText = text
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 4096); // OpenAI TTS limiti

    console.log(`TTS isteği: ${cleanText.substring(0, 50)}... (${cleanText.length} karakter)`);

    // OpenAI TTS API çağrısı
    const openaiResponse = await fetch(
      'https://api.openai.com/v1/audio/speech',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'tts-1',
          input: cleanText,
          voice: voiceId, // alloy, echo, fable, onyx, nova, shimmer
          response_format: 'mp3',
          speed: 1.0
        })
      }
    );

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text();
      console.error('OpenAI API hatası:', openaiResponse.status, errorText);
      
      // API hatası durumunda fallback
      return new Response(JSON.stringify({
        success: false,
        useNativeTTS: true,
        message: `OpenAI API hatası: ${openaiResponse.status}`,
        text: text
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Ses verisini al
    const audioData = await openaiResponse.arrayBuffer();
    
    console.log(`TTS başarılı: ${audioData.byteLength} bytes ses verisi`);

    // Ses verisini base64 encode et ve JSON olarak dön
    const base64Audio = btoa(
      String.fromCharCode(...new Uint8Array(audioData))
    );

    return new Response(JSON.stringify({
      success: true,
      useNativeTTS: false,
      audio: base64Audio,
      contentType: 'audio/mpeg',
      duration: Math.floor(cleanText.length / 15) // Yaklaşık süre (saniye)
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('TTS servisi genel hatası:', error);

    return new Response(JSON.stringify({
      success: false,
      useNativeTTS: true,
      message: error.message || 'TTS servisi hatası',
      error: {
        code: 'TTS_ERROR',
        message: error.message
      }
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
