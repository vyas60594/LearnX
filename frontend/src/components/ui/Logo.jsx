import { Link } from 'react-router';
import logo from '../../assets/learnx_logo.png';

const Logo = ({ 
    className = '', 
    size = 'md', 
    isDark = false, 
    to = '/', 
    disableLink = false,
    onClick = null 
}) => {
    // Proportional sizing maps
    const sizes = {
        sm: { img: 'h-6 w-6', text: 'text-lg' },
        md: { img: 'h-8 w-8', text: 'text-xl' },
        lg: { img: 'h-10 w-10', text: 'text-2xl' },
        xl: { img: 'h-12 w-12', text: 'text-3xl' },
        '2xl': { img: 'h-16 w-16', text: 'text-4xl' },
    };

    const s = sizes[size] || sizes.md;
    
    // Clean, static typography with zero animations
    const textClasses = `${s.text} font-extrabold tracking-tight ml-2.5 
        ${isDark ? 'text-white' : 'text-slate-900'}`;

    const Wrapper = disableLink ? 'div' : Link;
    const wrapperProps = disableLink ? { onClick } : { to };

    return (
        <Wrapper 
            {...wrapperProps} 
            className={`flex items-center shrink-0 outline-none ${disableLink && onClick ? 'cursor-pointer' : ''} ${className}`}
        >
            <img 
                src={logo} 
                alt="LearnX Logo" 
                className={`${s.img} object-contain`} 
            />
            <span className={textClasses}>
                LearnX
            </span>
        </Wrapper>
    );
};

export default Logo;
