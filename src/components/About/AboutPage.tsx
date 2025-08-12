import React from 'react';
import { Leaf, Users, Globe, Award, Heart, Target, Lightbulb, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const features = [
    {
      icon: Users,
      title: 'Güçlü Topluluk',
      description: '12,000+ aktif çiftçi ve tarım severin buluşma noktası',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      icon: Lightbulb,
      title: 'Yenilikçi Teknoloji',
      description: 'AI, IoT ve blockchain teknolojileri ile akıllı tarım',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: Globe,
      title: 'Sürdürülebilirlik',
      description: 'Çevre dostu tarım uygulamaları ve karbon ayak izi takibi',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: Shield,
      title: 'Güvenilir Platform',
      description: 'Blockchain sertifikaları ile güvenilir ürün doğrulaması',
      color: 'from-orange-400 to-red-500'
    }
  ];

  const team = [
    {
      name: 'Dr. Mehmet Özkan',
      role: 'Kurucu & CEO',
      bio: '15 yıllık tarım deneyimi',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1'
    },
    {
      name: 'Fatma Kaya',
      role: 'CTO',
      bio: 'Teknoloji ve inovasyon lideri',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1'
    },
    {
      name: 'Ahmet Demir',
      role: 'Topluluk Müdürü',
      bio: 'Çiftçi topluluğu uzmanı',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1'
    }
  ];

  const stats = [
    { label: 'Aktif Kullanıcı', value: '12,450+' },
    { label: 'Günlük Paylaşım', value: '1,200+' },
    { label: 'Çözülen Soru', value: '8,750+' },
    { label: 'Başarılı Hasat', value: '3,400+' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 text-white shadow-2xl mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl w-20 h-20 mx-auto mb-6">
            <Leaf className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            TarımVerse Hakkında
          </h1>
          <p className="text-xl text-green-100 leading-relaxed">
            Türkiye'nin en büyük tarım topluluğu olarak, çiftçilerin, bahçıvanların ve tarım severlerin 
            bilgi paylaştığı, öğrendiği ve büyüdüğü dijital bir ekosistem yaratıyoruz.
          </p>
        </motion.div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8"
        >
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-2xl w-16 h-16 mb-6">
            <Target className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Misyonumuz</h2>
          <p className="text-gray-700 leading-relaxed">
            Teknoloji ile tarımı buluşturarak, sürdürülebilir ve verimli tarım uygulamalarını 
            yaygınlaştırmak. Çiftçilerin bilgiye erişimini kolaylaştırarak, tarımsal üretkenliği 
            artırmak ve gıda güvenliğine katkıda bulunmak.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8"
        >
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-2xl w-16 h-16 mb-6">
            <Lightbulb className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Vizyonumuz</h2>
          <p className="text-gray-700 leading-relaxed">
            Dünya çapında tarım sektörünün dijital dönüşümüne öncülük etmek. 
            Yapay zeka, IoT ve blockchain teknolojilerini kullanarak, 
            geleceğin akıllı tarım ekosistemini bugünden inşa etmek.
          </p>
        </motion.div>
      </div>

      {/* Features */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Neden TarımVerse?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Modern tarımın ihtiyaçlarını karşılayan kapsamlı özellikler
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className={`bg-gradient-to-r ${feature.color} p-3 rounded-xl w-12 h-12 mb-4`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-8 text-white shadow-2xl mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Rakamlarla TarımVerse</h2>
          <p className="text-gray-300">Büyüyen topluluğumuzun başarıları</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-300 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ekibimiz</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tarım ve teknoloji alanında deneyimli uzmanlardan oluşan ekibimiz
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-all duration-300"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-24 h-24 rounded-2xl mx-auto mb-4 border-4 border-green-300"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-green-600 font-medium mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl text-center">
        <Heart className="h-12 w-12 text-white mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Bizimle İletişime Geçin</h2>
        <p className="text-green-100 mb-6 max-w-2xl mx-auto">
          Sorularınız, önerileriniz veya işbirliği teklifleriniz için bize ulaşın. 
          Tarımın geleceğini birlikte şekillendirelim!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-green-600 px-8 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition-colors">
            İletişim
          </button>
          <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-2xl font-semibold hover:bg-white/30 transition-colors">
            Destek
          </button>
        </div>
      </div>
    </div>
  );
}