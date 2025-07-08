import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, MapPin, Ruler, Sun, Droplets, Calendar, Leaf } from 'lucide-react';
import { usePlantingStore } from '../../store/plantingStore';
import { useAuthStore } from '../../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

export default function GardenPlanner() {
  const [showCreateGarden, setShowCreateGarden] = useState(false);
  const [showCreateSchedule, setShowCreateSchedule] = useState(false);
  const [selectedGarden, setSelectedGarden] = useState<string>('');
  const [editingGarden, setEditingGarden] = useState<string | null>(null);

  const {
    userGardens,
    plantingSchedules,
    crops,
    loading,
    fetchUserGardens,
    fetchPlantingSchedules,
    fetchCrops,
    createGarden,
    updateGarden,
    deleteGarden,
    createPlantingSchedule,
    updatePlantingSchedule
  } = usePlantingStore();

  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      fetchUserGardens();
      fetchPlantingSchedules();
      fetchCrops();
    }
  }, [user]);

  const [gardenForm, setGardenForm] = useState({
    name: '',
    location: '',
    region: 'Akdeniz',
    size_sqm: '',
    soil_type: '',
    sun_exposure: 'tam güneş',
    water_source: 'musluk',
    garden_type: 'açık alan',
    notes: ''
  });

  const [scheduleForm, setScheduleForm] = useState({
    garden_id: '',
    crop_id: '',
    planned_planting_date: '',
    quantity: '',
    area_used_sqm: '',
    notes: ''
  });

  const regions = ['Akdeniz', 'Ege', 'Marmara', 'Karadeniz', 'İç Anadolu', 'Doğu Anadolu', 'Güneydoğu Anadolu'];
  const sunExposures = ['tam güneş', 'yarı gölge', 'gölge'];
  const waterSources = ['musluk', 'kuyu', 'yağmur', 'damla sulama'];
  const gardenTypes = ['açık alan', 'sera', 'balkon', 'çatı bahçesi', 'kapalı alan'];
  const soilTypes = ['humuslu', 'killi', 'kumlu', 'karışık'];

  const handleCreateGarden = async (e: React.FormEvent) => {
    e.preventDefault();
    await createGarden({
      ...gardenForm,
      size_sqm: gardenForm.size_sqm ? parseFloat(gardenForm.size_sqm) : undefined
    });
    setGardenForm({
      name: '',
      location: '',
      region: 'Akdeniz',
      size_sqm: '',
      soil_type: '',
      sun_exposure: 'tam güneş',
      water_source: 'musluk',
      garden_type: 'açık alan',
      notes: ''
    });
    setShowCreateGarden(false);
  };

  const handleCreateSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCrop = crops.find(c => c.id === scheduleForm.crop_id);
    if (!selectedCrop) return;

    const plantingDate = new Date(scheduleForm.planned_planting_date);
    const harvestDate = new Date(plantingDate);
    harvestDate.setDate(harvestDate.getDate() + selectedCrop.growing_days);

    await createPlantingSchedule({
      ...scheduleForm,
      expected_harvest_date: harvestDate.toISOString().split('T')[0],
      area_used_sqm: scheduleForm.area_used_sqm ? parseFloat(scheduleForm.area_used_sqm) : undefined
    });

    setScheduleForm({
      garden_id: '',
      crop_id: '',
      planned_planting_date: '',
      quantity: '',
      area_used_sqm: '',
      notes: ''
    });
    setShowCreateSchedule(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned': return 'bg-blue-100 text-blue-800';
      case 'planted': return 'bg-green-100 text-green-800';
      case 'growing': return 'bg-yellow-100 text-yellow-800';
      case 'harvested': return 'bg-purple-100 text-purple-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'planned': return 'Planlandı';
      case 'planted': return 'Ekildi';
      case 'growing': return 'Büyüyor';
      case 'harvested': return 'Hasat Edildi';
      case 'failed': return 'Başarısız';
      default: return status;
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-12">
          <Leaf className="h-16 w-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Bahçe Planlayıcısı</h2>
          <p className="text-gray-600 mb-6">Kişisel bahçe planlarınızı oluşturmak için giriş yapmalısınız.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center">
              <Leaf className="h-8 w-8 mr-3 text-green-600" />
              Bahçe Planlayıcısı
            </h1>
            <p className="text-green-600 mt-2">Bahçelerinizi planlayın ve ekim programlarınızı oluşturun</p>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => setShowCreateGarden(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="h-5 w-5" />
              <span className="font-semibold">Bahçe Ekle</span>
            </button>
            
            {userGardens.length > 0 && (
              <button
                onClick={() => setShowCreateSchedule(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Calendar className="h-5 w-5" />
                <span className="font-semibold">Ekim Planla</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Gardens Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {userGardens.map((garden, index) => (
          <motion.div
            key={garden.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{garden.name}</h3>
                <div className="flex items-center space-x-2 text-gray-600 mt-1">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{garden.location}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingGarden(garden.id)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-xl transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deleteGarden(garden.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-xl transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-green-50 rounded-2xl p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Ruler className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Alan</span>
                </div>
                <p className="text-green-900 font-bold">
                  {garden.size_sqm ? `${garden.size_sqm} m²` : 'Belirtilmemiş'}
                </p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Sun className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Güneş</span>
                </div>
                <p className="text-blue-900 font-bold">{garden.sun_exposure || 'Belirtilmemiş'}</p>
              </div>

              <div className="bg-yellow-50 rounded-2xl p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Droplets className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-700">Su</span>
                </div>
                <p className="text-yellow-900 font-bold">{garden.water_source || 'Belirtilmemiş'}</p>
              </div>

              <div className="bg-purple-50 rounded-2xl p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Leaf className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700">Tür</span>
                </div>
                <p className="text-purple-900 font-bold">{garden.garden_type}</p>
              </div>
            </div>

            {garden.notes && (
              <div className="bg-gray-50 rounded-2xl p-3">
                <p className="text-sm text-gray-700">{garden.notes}</p>
              </div>
            )}
          </motion.div>
        ))}

        {userGardens.length === 0 && (
          <div className="col-span-2 text-center py-12">
            <Leaf className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Henüz bahçe eklenmemiş</h3>
            <p className="text-gray-600 mb-6">İlk bahçenizi ekleyerek başlayın!</p>
            <button
              onClick={() => setShowCreateGarden(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
            >
              Bahçe Ekle
            </button>
          </div>
        )}
      </div>

      {/* Planting Schedules */}
      {plantingSchedules.length > 0 && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Calendar className="h-6 w-6 mr-3 text-green-600" />
            Ekim Programlarım
          </h2>

          <div className="space-y-4">
            {plantingSchedules.map((schedule, index) => (
              <motion.div
                key={schedule.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200"
              >
                <div className="flex items-center space-x-4">
                  {schedule.crop?.image_url && (
                    <img
                      src={schedule.crop.image_url}
                      alt={schedule.crop.name}
                      className="h-12 w-12 rounded-xl object-cover"
                    />
                  )}
                  <div>
                    <h3 className="font-bold text-gray-900">{schedule.crop?.name}</h3>
                    <p className="text-sm text-gray-600">{schedule.garden?.name}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Ekim</p>
                    <p className="font-medium text-gray-900">
                      {format(new Date(schedule.planned_planting_date), 'dd MMM', { locale: tr })}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Hasat</p>
                    <p className="font-medium text-gray-900">
                      {format(new Date(schedule.expected_harvest_date), 'dd MMM', { locale: tr })}
                    </p>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(schedule.status)}`}>
                    {getStatusText(schedule.status)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Create Garden Modal */}
      <AnimatePresence>
        {showCreateGarden && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowCreateGarden(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-green-200/50 p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Yeni Bahçe Ekle</h2>
              
              <form onSubmit={handleCreateGarden} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Bahçe Adı *
                    </label>
                    <input
                      type="text"
                      value={gardenForm.name}
                      onChange={(e) => setGardenForm({ ...gardenForm, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
                      placeholder="Ön bahçe, arka bahçe..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Konum *
                    </label>
                    <input
                      type="text"
                      value={gardenForm.location}
                      onChange={(e) => setGardenForm({ ...gardenForm, location: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
                      placeholder="İstanbul, Ankara..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Bölge *
                    </label>
                    <select
                      value={gardenForm.region}
                      onChange={(e) => setGardenForm({ ...gardenForm, region: e.target.value })}
                      className="w-full px-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
                    >
                      {regions.map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Alan (m²)
                    </label>
                    <input
                      type="number"
                      value={gardenForm.size_sqm}
                      onChange={(e) => setGardenForm({ ...gardenForm, size_sqm: e.target.value })}
                      className="w-full px-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
                      placeholder="100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Toprak Türü
                    </label>
                    <select
                      value={gardenForm.soil_type}
                      onChange={(e) => setGardenForm({ ...gardenForm, soil_type: e.target.value })}
                      className="w-full px-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
                    >
                      <option value="">Seçiniz</option>
                      {soilTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Güneş Durumu
                    </label>
                    <select
                      value={gardenForm.sun_exposure}
                      onChange={(e) => setGardenForm({ ...gardenForm, sun_exposure: e.target.value })}
                      className="w-full px-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
                    >
                      {sunExposures.map(exposure => (
                        <option key={exposure} value={exposure}>{exposure}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Su Kaynağı
                    </label>
                    <select
                      value={gardenForm.water_source}
                      onChange={(e) => setGardenForm({ ...gardenForm, water_source: e.target.value })}
                      className="w-full px-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
                    >
                      {waterSources.map(source => (
                        <option key={source} value={source}>{source}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Bahçe Türü
                    </label>
                    <select
                      value={gardenForm.garden_type}
                      onChange={(e) => setGardenForm({ ...gardenForm, garden_type: e.target.value })}
                      className="w-full px-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
                    >
                      {gardenTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Notlar
                  </label>
                  <textarea
                    value={gardenForm.notes}
                    onChange={(e) => setGardenForm({ ...gardenForm, notes: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
                    placeholder="Bahçeniz hakkında ek bilgiler..."
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateGarden(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
                  >
                    Bahçe Oluştur
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create Schedule Modal */}
      <AnimatePresence>
        {showCreateSchedule && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowCreateSchedule(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-green-200/50 p-8 w-full max-w-2xl"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ekim Programı Oluştur</h2>
              
              <form onSubmit={handleCreateSchedule} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Bahçe *
                    </label>
                    <select
                      value={scheduleForm.garden_id}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, garden_id: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
                    >
                      <option value="">Bahçe seçiniz</option>
                      {userGardens.map(garden => (
                        <option key={garden.id} value={garden.id}>{garden.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ürün *
                    </label>
                    <select
                      value={scheduleForm.crop_id}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, crop_id: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
                    >
                      <option value="">Ürün seçiniz</option>
                      {crops.map(crop => (
                        <option key={crop.id} value={crop.id}>{crop.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ekim Tarihi *
                    </label>
                    <input
                      type="date"
                      value={scheduleForm.planned_planting_date}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, planned_planting_date: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Miktar
                    </label>
                    <input
                      type="text"
                      value={scheduleForm.quantity}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, quantity: e.target.value })}
                      className="w-full px-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
                      placeholder="10 adet, 2 kg..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Kullanılan Alan (m²)
                    </label>
                    <input
                      type="number"
                      value={scheduleForm.area_used_sqm}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, area_used_sqm: e.target.value })}
                      className="w-full px-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
                      placeholder="5"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Notlar
                  </label>
                  <textarea
                    value={scheduleForm.notes}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, notes: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
                    placeholder="Ekim hakkında notlar..."
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateSchedule(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
                  >
                    Program Oluştur
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}