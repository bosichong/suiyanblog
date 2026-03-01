import config from '@/config';

const NavIcons: React.FC = () => {
    return (
        <div className="nav-menu">
            {config.menuItems.map((item) => {
                return (
                    <a
                        key={item.name}
                        href={item.href}
                    >
                        {item.name}
                    </a>
                );
            })}
        </div>
    );
};

export default NavIcons;