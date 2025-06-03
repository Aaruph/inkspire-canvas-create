
import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import TattooCanvas from '@/components/TattooCanvas';
import BodyPreview from '@/components/BodyPreview';
import ToolPanel from '@/components/ToolPanel';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const Customize = () => {
  const [activeTab, setActiveTab] = useState('draw');
  const [activeColor, setActiveColor] = useState('#000000'); 
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [canvasImage, setCanvasImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    // If switching to preview tab, capture the canvas
    if (tab === 'preview') {
      captureCanvas();
    }
  };

  const captureCanvas = () => {
    const canvasElement = canvasRef.current?.querySelector('canvas');
    if (canvasElement) {
      try {
        const dataUrl = canvasElement.toDataURL('image/png');
        setCanvasImage(dataUrl);
      } catch (error) {
        console.error('Error capturing canvas:', error);
        toast.error('Failed to capture your design. Please try again.');
      }
    }
  };

  const handleSaveDesign = () => {
    captureCanvas();
    
    // In a real app, this would save to a database or local storage
    // For now we just show a toast notification
    toast.success('Your design has been saved!');
  };

  const handleAddText = (text: string, font: string, color: string, size: number) => {
    console.log('Text added:', { text, font, color, size });
    // This will be handled by the TattooCanvas component
  };

  // Handle initial canvas capture if starting directly on preview tab
  useEffect(() => {
    if (activeTab === 'preview' && !canvasImage) {
      // Small delay to ensure canvas is rendered
      const timer = setTimeout(() => {
        captureCanvas();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [activeTab, canvasImage]);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      <main className="flex-grow">
        <div className="ink-container py-6 md:py-10">
          <h1 className="text-4xl md:text-6xl font-display text-white mb-4 tracking-wider uppercase">
            <span className="block">CREATE YOUR</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400">PERFECT TATTOO</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-8 font-medium">
            Express yourself through ink. Design with our powerful tools, add custom text, or choose from curated templates.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Side - Tool Panel */}
            <div className="lg:col-span-1">
              <ToolPanel 
                onTabChange={handleTabChange} 
                activeTab={activeTab}
                onSaveDesign={handleSaveDesign}
                onAddText={handleAddText}
              />
            </div>
            
            {/* Right Side - Canvas/Preview Area */}
            <div className="lg:col-span-3 bg-zinc-900 rounded-lg border border-zinc-700 p-4 min-h-[600px] shadow-2xl">
              {activeTab === 'draw' && (
                <div ref={canvasRef} className="h-full">
                  <TattooCanvas 
                    activeColor={activeColor}
                    strokeWidth={strokeWidth}
                    onColorChange={setActiveColor}
                    onStrokeWidthChange={setStrokeWidth}
                    onAddText={handleAddText}
                  />
                </div>
              )}
              
              {activeTab === 'preview' && (
                <div className="h-full">
                  <BodyPreview canvasImage={canvasImage} />
                </div>
              )}
              
              {activeTab === 'customize' && (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center max-w-md mx-auto p-8">
                    <h3 className="text-2xl font-display uppercase tracking-wider text-white mb-4">Text Tattoo Studio</h3>
                    <p className="text-gray-400 mb-6">
                      Use the text editor in the left panel to create beautiful text tattoos with custom fonts and colors.
                    </p>
                    <p className="text-white font-semibold">
                      Switch to the Draw tab to see your text on the canvas!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Simple Footer */}
      <footer className="mt-auto border-t border-zinc-800 py-6">
        <div className="ink-container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="font-display text-2xl text-white tracking-wider uppercase">Inkspire</span>
            </div>
            <div className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Inkspire. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Customize;
