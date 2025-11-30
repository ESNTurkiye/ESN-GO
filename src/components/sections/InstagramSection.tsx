'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram } from 'lucide-react';

export default function InstagramSection() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Sample Instagram posts - you can replace with actual data
    const instagramPosts = [
        {
            id: 1,
            image: "https://scontent.cdninstagram.com/v/t51.82787-15/586830704_18544522813011790_8739085506086915025_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ig_cache_key=Mzc3NDM0MTg4ODQwOTYwMjA1OA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwMTJ4MTM0Ny5zZHIuQzMifQ%3D%3D&_nc_ohc=YavpMOY2tDwQ7kNvwERXiJF&_nc_oc=AdlF5-oIIYRRcHMFpeWb80WtSX_djS9kAAgTvOUmVvuvcbjqkN6rclwHVHi-l5wXuQI&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&se=7&_nc_ht=scontent.cdninstagram.com&_nc_gid=QpF6N9N8DVtevJ8KCRlXbA&oh=00_AfjZJkzsC_JZUuDnTt-ms7SStWnvABGPkeqKQhzYDcS0rw&oe=6931D83F",
            likes: 1234,
            caption: "Exploring Cappadocia's fairy chimneys! 🎈"
        },
        {
            id: 2,
            image: "https://scontent.cdninstagram.com/v/t51.82787-15/587513627_18544076680011790_1066957510659087584_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=100&ig_cache_key=Mzc3MjI1MjUwMDg0NjQ0NTY4MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwMTJ4MTM0Ny5zZHIuQzMifQ%3D%3D&_nc_ohc=3vpe8kVUMaEQ7kNvwEpGLqN&_nc_oc=AdmjhWRGg5TwpEx_r5JlE9hn_JPDyDbxKyeerIBpgjJ8BWgyq_5PWzxSV3sXLmcv95I&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&se=7&_nc_ht=scontent.cdninstagram.com&_nc_gid=7SMC5gtCkOTYaXguP1Wpdg&oh=00_AfjBLj7E8sq-w21v0sVdXFjxHODcsz5AEKaHo1YhXOolEQ&oe=6931EE67",
            likes: 2341,
            caption: "Sunset over the Bosphorus ✨"
        },
        {
            id: 3,
            image: "https://scontent.cdninstagram.com/v/t51.82787-15/586830704_18544522813011790_8739085506086915025_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ig_cache_key=Mzc3NDM0MTg4ODQwOTYwMjA1OA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwMTJ4MTM0Ny5zZHIuQzMifQ%3D%3D&_nc_ohc=YavpMOY2tDwQ7kNvwERXiJF&_nc_oc=AdlF5-oIIYRRcHMFpeWb80WtSX_djS9kAAgTvOUmVvuvcbjqkN6rclwHVHi-l5wXuQI&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&se=7&_nc_ht=scontent.cdninstagram.com&_nc_gid=QpF6N9N8DVtevJ8KCRlXbA&oh=00_AfjZJkzsC_JZUuDnTt-ms7SStWnvABGPkeqKQhzYDcS0rw&oe=6931D83F",
            likes: 1234,
            caption: "Exploring Cappadocia's fairy chimneys! 🎈"
        },
        {
            id: 4,
            image: "https://scontent.cdninstagram.com/v/t51.82787-15/587513627_18544076680011790_1066957510659087584_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=100&ig_cache_key=Mzc3MjI1MjUwMDg0NjQ0NTY4MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwMTJ4MTM0Ny5zZHIuQzMifQ%3D%3D&_nc_ohc=3vpe8kVUMaEQ7kNvwEpGLqN&_nc_oc=AdmjhWRGg5TwpEx_r5JlE9hn_JPDyDbxKyeerIBpgjJ8BWgyq_5PWzxSV3sXLmcv95I&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&se=7&_nc_ht=scontent.cdninstagram.com&_nc_gid=7SMC5gtCkOTYaXguP1Wpdg&oh=00_AfjBLj7E8sq-w21v0sVdXFjxHODcsz5AEKaHo1YhXOolEQ&oe=6931EE67",
            likes: 2341,
            caption: "Sunset over the Bosphorus ✨"
        },
        {
            id: 5,
            image: "https://scontent.cdninstagram.com/v/t51.82787-15/586830704_18544522813011790_8739085506086915025_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ig_cache_key=Mzc3NDM0MTg4ODQwOTYwMjA1OA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwMTJ4MTM0Ny5zZHIuQzMifQ%3D%3D&_nc_ohc=YavpMOY2tDwQ7kNvwERXiJF&_nc_oc=AdlF5-oIIYRRcHMFpeWb80WtSX_djS9kAAgTvOUmVvuvcbjqkN6rclwHVHi-l5wXuQI&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&se=7&_nc_ht=scontent.cdninstagram.com&_nc_gid=QpF6N9N8DVtevJ8KCRlXbA&oh=00_AfjZJkzsC_JZUuDnTt-ms7SStWnvABGPkeqKQhzYDcS0rw&oe=6931D83F",
            likes: 1234,
            caption: "Exploring Cappadocia's fairy chimneys! 🎈"
        }
    ];

    return (
        <section className="py-20 bg-linear-to-br from-white via-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-esn-magenta via-[#AE2573] to-esn-dark-blue flex items-center justify-center">
                            <Instagram className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-oswald font-bold text-esn-dark-blue mb-4 uppercase">
                        Follow Along on Instagram
                    </h2>
                    <p className="text-xl text-gray-600 font-lato mb-6 max-w-2xl mx-auto">
                        Join our community and share your Erasmus adventures in Türkiye
                    </p>
                    <Link
                        href="https://www.instagram.com/esn_turkey/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-esn-magenta to-esn-dark-blue text-white rounded-lg font-oswald font-bold uppercase text-lg hover:shadow-2xl transition-all hover:-translate-y-1"
                    >
                        <Instagram className="w-5 h-5" />
                        @esn_turkey
                    </Link>
                </div>

                {/* Instagram Grid */}
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                     {instagramPosts.map((post, index) => (
                         <Link
                             key={post.id}
                             href="https://www.instagram.com/esn_turkey/"
                             target="_blank"
                             rel="noopener noreferrer"
                             className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
                             onMouseEnter={() => setHoveredIndex(index)}
                             onMouseLeave={() => setHoveredIndex(null)}
                         >
                             {/* Image */}
                             <Image
                                 src={post.image}
                                 alt={post.caption}
                                 fill
                                 className="object-cover transition-transform duration-500 group-hover:scale-110"
                             />

                            {/* Overlay on hover */}
                            <div
                                className={`absolute inset-0 bg-linear-to-br from-esn-magenta/90 via-[#AE2573]/90 to-esn-dark-blue/90 flex items-center justify-center transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                                    }`}
                            >
                                <div className="text-center text-white p-4">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <svg
                                            className="w-6 h-6 fill-current"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                        <span className="font-oswald font-bold">{post.likes.toLocaleString()}</span>
                                    </div>
                                    <p className="text-xs font-lato line-clamp-2">{post.caption}</p>
                                </div>
                            </div>

                            {/* Instagram icon overlay */}
                             <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                 <Instagram className="w-6 h-6 text-white drop-shadow-lg" />
                             </div>
                         </Link>
                     ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12">
                    <p className="text-gray-600 font-lato text-lg mb-4">
                        Tag us in your posts with <span className="font-bold text-esn-magenta">#ESNTurkey</span> and <span className="font-bold text-esn-cyan">#ThisIsESN</span>
                    </p>
                    <p className="text-sm text-gray-500 font-lato">
                        Your adventure could be featured next! 📸
                    </p>
                </div>
            </div>
        </section>
    );
}