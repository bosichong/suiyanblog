// components/AtroposFriendCard.js
import { useEffect, useRef } from 'react';
import { Link, Image, Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react';
import Atropos from 'atropos';
import 'atropos/css';
import { useTheme } from 'next-themes';

const AtroposFriendCard = ({ link }) => {
  const atroposRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    // 初始化Atropos
    const myAtropos = Atropos({
      el: atroposRef.current,
      activeOffset: 40,
      shadowScale: 1.05,
      highlight: true,
      rotateXMax: 10,
      rotateYMax: 10,
      shadow: true, // 始终启用阴影，通过CSS控制不同主题下的显示效果
      shadowOffset: 50,
      shadowScale: 0.9,
      duration: 400
    });

    // 组件卸载时清理
    return () => {
      myAtropos.destroy();
    };
  }, [theme]); // 添加theme作为依赖项，当主题变化时重新初始化

  return (
    <div className="atropos-wrapper my-2">
      <div className="atropos" ref={atroposRef}>
        <div className="atropos-scale">
          <div className="atropos-rotate">
            <div className="atropos-inner">
              <Card className="atropos-card" key={link.site_name}>
                <CardHeader className="flex gap-3 justify-center" data-atropos-offset="5">
                  <Image
                    src={link.site_avatar}
                    alt={link.site_name}
                    className="h-24 w-24 rounded-full object-cover shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-110 group-hover:rotate-3"
                    data-atropos-offset="5"
                  />
                </CardHeader>

                <CardBody data-atropos-offset="3" className="flex flex-col items-center space-y-4">
                  <h3 className="text-xl font-semibold text-foreground transition-all duration-300 group-hover:text-primary">
                    <Link href={link.site_url} color="primary">
                      {link.site_name}
                    </Link>
                  </h3>
                  <p className="text-center text-sm leading-relaxed text-default-600 line-clamp-3 transition-all duration-300 group-hover:text-default-800 dark:group-hover:text-default-400">
                    {link.site_description}
                  </p>
                </CardBody>

                <CardFooter className="text-sm justify-center" data-atropos-offset="1">
                  <Link
                    href={link.site_url}
                    color="primary"
                    className="transition-all duration-200 hover:translate-x-1 group-hover:font-medium"
                    underline="hover"
                  >
                    <span className="flex items-center gap-1 text-sm">
                      访问博客
                      <span className="i-mdi-arrow-right-thin transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtroposFriendCard;