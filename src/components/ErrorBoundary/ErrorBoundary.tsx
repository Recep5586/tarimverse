import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRefresh = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-red-200/50 p-12 text-center max-w-2xl">
            <div className="text-red-400 mb-6">
              <AlertTriangle className="h-20 w-20 mx-auto" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Oops! Bir şeyler ters gitti 🌱
            </h1>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              Beklenmeyen bir hata oluştu. Bu durumu geliştirici ekibimize bildirdik. 
              Sayfayı yenilemeyi veya ana sayfaya dönmeyi deneyebilirsiniz.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 text-left">
                <h3 className="font-bold text-red-800 mb-2">Hata Detayları:</h3>
                <pre className="text-sm text-red-700 overflow-auto">
                  {this.state.error.message}
                </pre>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleRefresh}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <RefreshCw className="h-5 w-5" />
                <span className="font-medium">Sayfayı Yenile</span>
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Home className="h-5 w-5" />
                <span className="font-medium">Ana Sayfaya Dön</span>
              </button>
            </div>

            <div className="mt-8 text-sm text-gray-500">
              Sorun devam ederse{' '}
              <a 
                href="mailto:destek@tarimverse.com" 
                className="text-green-600 hover:text-green-700 font-medium underline"
              >
                destek@tarimverse.com
              </a>
              {' '}adresinden bize ulaşabilirsiniz.
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}