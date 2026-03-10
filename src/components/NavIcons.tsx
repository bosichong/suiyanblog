import config from '@/config';

const NavIcons: React.FC = () => {
    return (
        <ul>
            {config.menuItems.map((item) => {
                return (
                    <li key={item.name}>
                        <a
                            href={item.href}
                        >
                            {item.name}
                        </a>
                    </li>
                );
            })}
        </ul>
    );
};

export default NavIcons;