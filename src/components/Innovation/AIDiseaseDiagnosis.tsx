import React, { useState, useRef } from 'react';
import { Camera, Upload, Brain, AlertTriangle, CheckCircle, X, Zap, Leaf, Bug } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

interface DiagnosisResult {
  disease: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  treatment: string[];
  prevention: string[];
}

export default function AIDiseaseDiagnosis() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuthStore();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Dosya boyutu 5MB\'dan küçük olmalıdır');
        return;
      }
      
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults: DiagnosisResult[] = [
        {
          disease: 'Yaprak Lekesi Hastalığı',
          confidence: 0.92,
          severity: 'medium',
          description: 'Fungal bir hastalık olan yaprak lekesi hastalığı tespit edildi. Yapraklarda kahverengi lekeler görülmektedir.',
          treatment: [
            'Etkilenen yaprakları temizleyin',
            'Fungisit uygulayın',
            'Havalandırmayı artırın',
            'Sulamayı azaltın'
          ],
          prevention: [
            'Yaprakları kuru tutun',
            'Düzenli ilaçlama yapın',
            'Bitki aralıklarını artırın',
            'Organik gübre kullanın'
          ]
        },
        {
          disease: 'Yaprak Biti',
          confidence: 0.87,
          severity: 'high',
          description: 'Yaprak bitlerinin yoğun istilası tespit edildi. Yaprakların altında küçük yeşil böcekler görülmektedir.',
          treatment: [
            'Sabunlu su ile yıkayın',
            'Doğal predatörleri teşvik edin',
            'Neem yağı uygulayın',
            'Etkilenen kısımları kesin'
          ],
          prevention: [
            'Düzenli kontrol yapın',
            'Faydalı böcekleri koruyun',
            'Aşırı azotlu gübre kullanmayın',
            'Bitki çeşitliliğini artırın'
          ]
        }
      ];
      
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setDiagnosisResult(randomResult);
      setIsAnalyzing(false);
      setShowResult(true);
      toast.success('Analiz tamamlandı! 🔬');
    }, 3000);
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setDiagnosisResult(null);
    setShowResult(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'from-green-400 to-emerald-500';
      case 'medium': return 'from-yellow-400 to-orange-500';
      case 'high': return 'from-orange-400 to-red-500';
      case 'critical': return 'from-red-500 to-pink-600';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'low': return 'Düşük Risk';
      case 'medium': return 'Orta Risk';
      case 'high': return 'Yüksek Risk';
      case 'critical': return 'Kritik';
      default: return severity;
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-12">
          <Brain className="h-16 w-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Hastalık Teşhisi</h2>
          <p className="text-gray-600 mb-6">Yapay zeka destekli hastalık teşhisi için giriş yapmalısınız.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Brain className="h-8 w-8 mr-3" />
              AI Hastalık Teşhisi
            </h1>
            <p className="text-purple-100">Yapay zeka ile bitki hastalıklarını anında tespit edin</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">%95</div>
            <div className="text-purple-200 text-sm">Doğruluk Oranı</div>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Bitki Fotoğrafı Yükleyin</h2>
        
        {!imagePreview ? (
          <div className="border-2 border-dashed border-green-300 rounded-3xl p-12 text-center hover:border-green-400 transition-colors">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="text-green-400 mb-6">
                <Camera className="h-20 w-20 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fotoğraf Seçin</h3>
              <p className="text-gray-600 mb-4">
                Hastalık belirtisi gösteren bitki fotoğrafınızı yükleyin
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <span>JPG, PNG, WebP</span>
                <span>•</span>
                <span>Maksimum 5MB</span>
              </div>
            </label>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative group">
              <img
                src={imagePreview}
                alt="Selected plant"
                className="w-full h-96 object-cover rounded-2xl border-2 border-green-300"
              />
              <button
                onClick={resetAnalysis}
                className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-4 rounded-2xl hover:from-purple-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                    <span className="font-medium">AI Analiz Ediyor<span className="loading-dots"></span></span>
                  </>
                ) : (
                  <>
                    <Zap className="h-6 w-6" />
                    <span className="font-medium">AI ile Analiz Et</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-3xl p-8 border border-purple-200 mb-8"
        >
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Brain className="h-8 w-8 text-purple-600 animate-pulse" />
              <h3 className="text-xl font-bold text-purple-900">AI Analiz Süreci</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { step: 'Görüntü işleniyor...', completed: true },
                { step: 'Hastalık belirtileri taranıyor...', completed: true },
                { step: 'Veritabanı ile karşılaştırılıyor...', completed: false },
                { step: 'Tedavi önerileri hazırlanıyor...', completed: false }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-center space-x-3">
                  {item.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
                  )}
                  <span className={`${item.completed ? 'text-green-700' : 'text-purple-700'} font-medium`}>
                    {item.step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Results */}
      <AnimatePresence>
        {showResult && diagnosisResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Teşhis Sonucu</h2>
              <div className={`bg-gradient-to-r ${getSeverityColor(diagnosisResult.severity)} text-white px-4 py-2 rounded-2xl`}>
                <span className="font-bold text-sm">{getSeverityText(diagnosisResult.severity)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Diagnosis Info */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <Bug className="h-6 w-6 text-purple-600" />
                    <h3 className="text-xl font-bold text-purple-900">Tespit Edilen Hastalık</h3>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">{diagnosisResult.disease}</h4>
                  <p className="text-gray-700 mb-4">{diagnosisResult.description}</p>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Güven Oranı:</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${diagnosisResult.confidence * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-bold text-purple-600">
                      %{Math.round(diagnosisResult.confidence * 100)}
                    </span>
                  </div>
                </div>

                {/* Treatment */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                  <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center">
                    <Leaf className="h-5 w-5 mr-2" />
                    Tedavi Önerileri
                  </h3>
                  <ul className="space-y-2">
                    {diagnosisResult.treatment.map((step, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-green-800">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Prevention */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                  <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Önleme Yöntemleri
                  </h3>
                  <ul className="space-y-2">
                    {diagnosisResult.prevention.map((step, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <span className="text-blue-800">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expert Consultation */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
                  <h3 className="text-lg font-bold text-orange-900 mb-4">Uzman Desteği</h3>
                  <p className="text-orange-800 text-sm mb-4">
                    Daha detaylı bilgi için uzman tarım mühendislerimizle görüşebilirsiniz.
                  </p>
                  <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 font-medium">
                    Uzman Danışmanlığı Al
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={resetAnalysis}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-2xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 font-medium"
              >
                Yeni Analiz Yap
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* How it Works */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Nasıl Çalışır?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: 1,
              title: 'Fotoğraf Yükleyin',
              description: 'Hastalık belirtisi gösteren bitki fotoğrafınızı yükleyin',
              icon: Camera,
              color: 'from-blue-400 to-indigo-500'
            },
            {
              step: 2,
              title: 'AI Analizi',
              description: 'Yapay zeka görüntüyü analiz eder ve hastalığı tespit eder',
              icon: Brain,
              color: 'from-purple-400 to-pink-500'
            },
            {
              step: 3,
              title: 'Tedavi Önerileri',
              description: 'Detaylı tedavi ve önleme önerilerini alın',
              icon: Leaf,
              color: 'from-green-400 to-emerald-500'
            }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className={`bg-gradient-to-r ${item.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <item.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                {item.step}. {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}