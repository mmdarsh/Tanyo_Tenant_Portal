import React, { useState, useEffect, useCallback } from "react";
import { FiMaximize, FiDownload, FiX } from "react-icons/fi";
import ErrorModal from '../pages/ErrorModal';
import debounce from 'lodash/debounce';

interface BodyProps {
    categoryId: string;
    tenantId: string;
}

interface TenantDetails {
    tenantName: string;
    streetAddress1: string;
    streetAddress2: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
    emailId: string;
    phoneNumber: string;
    tenantLogo: string;
    currency: string | null;
}

interface Product {
    productTitle: string;
    productCoverImage: string;
    productModelNo: string;
    catagoriesName: string;
    height: number;
    width: number;
    depth: number;
    tenantOrganizationType: string;
    description: string | null;
    tenantDetails: TenantDetails | null;
    categoryFriendlyName: string;
    totalCount: number;
}

interface ApiResponse {
    version: string;
    statusCode: number;
    message: string;
    isError: null;
    responseException: null;
    result: {
        draw: string;
        recordsFiltered: number;
        recordsTotal: number;
        data: Product[];
    }
}

const ImageOverlay: React.FC<{
  image: string;
  alt: string;
  onClose: () => void;
}> = ({ image, alt, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const imgContainerRef = React.useRef<HTMLDivElement>(null);

  const handleFullscreen = () => {
    if (imgContainerRef.current) {
      if (imgContainerRef.current.requestFullscreen) {
        imgContainerRef.current.requestFullscreen();
      } else if ((imgContainerRef.current as any).webkitRequestFullscreen) {
        (imgContainerRef.current as any).webkitRequestFullscreen();
      }
      setIsFullscreen(true);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(image, { mode: 'cors' });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = alt || 'image';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to download image.');
    }
  };

  React.useEffect(() => {
    const exitHandler = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener("fullscreenchange", exitHandler);
    return () => document.removeEventListener("fullscreenchange", exitHandler);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col items-center justify-center">
      <div
        ref={imgContainerRef}
        className="relative flex flex-col items-center justify-center w-full h-full"
      >
        {/* Close Button */}
        <button
          className="fixed top-4 right-4 text-black! text-3xl font-bold hover:text-[#ffc901] focus:outline-none z-50"
          onClick={onClose}
          aria-label="Close"
        >
          <FiX />
        </button>
        {/* Image */}
        <img
          src={image}
          alt={alt}
          className="max-h-[70vh] max-w-[90vw] rounded shadow-lg object-contain bg-white"
        />
        {/* Controls */}
        <div className="mt-6 flex flex-row flex-wrap gap-4 justify-center items-center w-full">
          <button
            className="bg-[#ffc901] text-black p-2 rounded-full shadow hover:bg-yellow-400 text-xl"
            onClick={handleFullscreen}
            title="View Fullscreen"
          >
            <FiMaximize />
          </button>
          <button
            className="bg-[#ffc901] text-black p-2 rounded-full shadow hover:bg-yellow-400 text-xl"
            onClick={handleDownload}
            title="Download Image"
          >
            <FiDownload />
          </button>
        </div>
      </div>
    </div>
  );
};

const Body: React.FC<BodyProps> = ({ categoryId, tenantId }) => {
    const [overlay, setOverlay] = useState<null | { image: string; alt: string }>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const initialFetchDone = React.useRef(false);
    
    // Error state
    const [error, setError] = useState<{
        isOpen: boolean;
        message: string;
        title?: string;
    }>({
        isOpen: false,
        message: '',
        title: 'Error'
    });

    const fetchData = async () => {
        if (!hasMore || isLoading) return;

        try {
            setIsLoading(true);
            const response = await fetch('https://devapi.tanyo.in/api/Catalog/GetCatalogueByCategoryWithTenant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    categoryId,
                    tenantId,
                    pageIndex: currentPage,
                    pageSize
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: ApiResponse = await response.json();

            if (data.statusCode !== 200) {
                throw new Error(data.message || 'Failed to fetch data');
            }

            if (data.result.data && data.result.data.length > 0) {
                setProducts(prevProducts => [...prevProducts, ...data.result.data]);
                setCurrentPage(prev => prev + 1);
                setHasMore(products.length + data.result.data.length < data.result.recordsTotal);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError({
                isOpen: true,
                message: error instanceof Error ? error.message : 'An unexpected error occurred',
                title: 'Error Loading Data'
            });
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    };

    // Initial data fetch
    useEffect(() => {
        if (!initialFetchDone.current) {
            initialFetchDone.current = true;
            fetchData();
        }
    }, []); // Empty dependency array for initial load only

    // Debounced scroll handler
    const debouncedScrollHandler = useCallback(
        debounce(() => {
            const totalHeight = document.documentElement.scrollHeight;
            const scrollPosition = window.scrollY + window.innerHeight;
            if (totalHeight - scrollPosition < 100 && !isLoading && hasMore) {
                fetchData();
            }
        }, 200),
        [isLoading, hasMore]
    );

    useEffect(() => {
        window.addEventListener('scroll', debouncedScrollHandler);
        return () => {
            window.removeEventListener('scroll', debouncedScrollHandler);
            debouncedScrollHandler.cancel();
        };
    }, [debouncedScrollHandler]);

    return (
        <main className="p-4 md:p-8 bg-gray-50 min-h-screen">
            {/* Error Modal */}
            <ErrorModal
                isOpen={error.isOpen}
                message={error.message}
                title={error.title}
                onClose={() => setError(prev => ({ ...prev, isOpen: false }))}
            />

            {/* Existing overlay */}
            {overlay && (
                <ImageOverlay
                    image={overlay.image}
                    alt={overlay.alt}
                    onClose={() => setOverlay(null)}
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, idx) => (
                    <div
                        key={`${product.productModelNo}-${idx}`}
                        className="bg-white rounded shadow-lg overflow-hidden flex flex-col relative group"
                    >
                        <span className="absolute top-2 left-2 bg-[#ffc901] text-xs font-semibold px-3 py-1 rounded z-10">
                            {product.categoryFriendlyName}
                        </span>
                        <div
                            className="h-56 w-full overflow-hidden flex items-center justify-center bg-gray-100 cursor-pointer relative"
                            onClick={() => setOverlay({ 
                                image: product.productCoverImage, 
                                alt: product.productTitle 
                            })}
                        >
                            {/* Loading placeholder */}
                            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                            
                            <img
                                src={product.productCoverImage}
                                alt={product.productTitle}
                                loading="lazy"
                                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-125 relative "
                                onLoad={(e) => {
                                    const img = e.target as HTMLImageElement;
                                    img.style.opacity = '1';
                                }}
                                style={{ opacity: 0 }}
                            />
                        </div>
                        
                        <div className="p-4">
                            <div className="font-semibold text-lg truncate mb-2 uppercase">
                                {product.productTitle}
                            </div>
                            <div className="bg-gray-100 rounded p-2 text-xs font-medium text-gray-700 mb-1">
                                Model No : {product.productModelNo}
                            </div>
                            {product.tenantDetails && (
                                <div className="mt-2 text-sm text-gray-600">
                                    <p>By: {product.tenantDetails.tenantName}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {isLoading && (
                <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg flex items-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-4 border-[#ffc901] border-t-transparent"></div>
                    <span className="text-gray-700 font-medium">Loading more items...</span>
                </div>
            )}
        </main>
    );
};

export default Body;
