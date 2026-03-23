'use client'

import { useEffect, useState } from 'react';
import PaletteIcon from './icons/PaletteIcon';

type ThemeMode = 'auto' | 'light' | 'dark';

interface ColorTheme {
  name: string;
  color: string;
  primary: string;
  primaryBackground: string;
  primaryBorder: string;
  primaryUnderline: string;
  primaryHover: string;
  primaryHoverBackground: string;
  primaryHoverBorder: string;
  primaryHoverUnderline: string;
  primaryFocus: string;
  primaryInverse: string;
}

const colorThemes: ColorTheme[] = [
  { name: 'Red', color: '#e03131', primary: '#e03131', primaryBackground: '#e03131', primaryBorder: '#e03131', primaryUnderline: 'rgba(224, 49, 49, 0.5)', primaryHover: '#c92a2a', primaryHoverBackground: '#c92a2a', primaryHoverBorder: '#c92a2a', primaryHoverUnderline: '#c92a2a', primaryFocus: 'rgba(224, 49, 49, 0.5)', primaryInverse: '#ffffff' },
  { name: 'Pink', color: '#c2255c', primary: '#c2255c', primaryBackground: '#c2255c', primaryBorder: '#c2255c', primaryUnderline: 'rgba(194, 37, 92, 0.5)', primaryHover: '#a61e4d', primaryHoverBackground: '#a61e4d', primaryHoverBorder: '#a61e4d', primaryHoverUnderline: '#a61e4d', primaryFocus: 'rgba(194, 37, 92, 0.5)', primaryInverse: '#ffffff' },
  { name: 'Fuchsia', color: '#9c36b5', primary: '#9c36b5', primaryBackground: '#9c36b5', primaryBorder: '#9c36b5', primaryUnderline: 'rgba(156, 54, 181, 0.5)', primaryHover: '#862e9c', primaryHoverBackground: '#862e9c', primaryHoverBorder: '#862e9c', primaryHoverUnderline: '#862e9c', primaryFocus: 'rgba(156, 54, 181, 0.5)', primaryInverse: '#ffffff' },
  { name: 'Purple', color: '#7950f2', primary: '#7950f2', primaryBackground: '#7950f2', primaryBorder: '#7950f2', primaryUnderline: 'rgba(121, 80, 242, 0.5)', primaryHover: '#7048e7', primaryHoverBackground: '#7048e7', primaryHoverBorder: '#7048e7', primaryHoverUnderline: '#7048e7', primaryFocus: 'rgba(121, 80, 242, 0.5)', primaryInverse: '#ffffff' },
  { name: 'Violet', color: '#5f3dc4', primary: '#5f3dc4', primaryBackground: '#5f3dc4', primaryBorder: '#5f3dc4', primaryUnderline: 'rgba(95, 61, 196, 0.5)', primaryHover: '#5c2c9c', primaryHoverBackground: '#5c2c9c', primaryHoverBorder: '#5c2c9c', primaryHoverUnderline: '#5c2c9c', primaryFocus: 'rgba(95, 61, 196, 0.5)', primaryInverse: '#ffffff' },
  { name: 'Indigo', color: '#4263eb', primary: '#4263eb', primaryBackground: '#4263eb', primaryBorder: '#4263eb', primaryUnderline: 'rgba(66, 99, 235, 0.5)', primaryHover: '#3b5bdb', primaryHoverBackground: '#3b5bdb', primaryHoverBorder: '#3b5bdb', primaryHoverUnderline: '#3b5bdb', primaryFocus: 'rgba(66, 99, 235, 0.5)', primaryInverse: '#ffffff' },
  { name: 'Blue', color: '#1c7ed6', primary: '#1c7ed6', primaryBackground: '#1c7ed6', primaryBorder: '#1c7ed6', primaryUnderline: 'rgba(28, 126, 214, 0.5)', primaryHover: '#1971c2', primaryHoverBackground: '#1971c2', primaryHoverBorder: '#1971c2', primaryHoverUnderline: '#1971c2', primaryFocus: 'rgba(28, 126, 214, 0.5)', primaryInverse: '#ffffff' },
  { name: 'Azure', color: '#1098ad', primary: '#1098ad', primaryBackground: '#1098ad', primaryBorder: '#1098ad', primaryUnderline: 'rgba(16, 152, 173, 0.5)', primaryHover: '#0c8599', primaryHoverBackground: '#0c8599', primaryHoverBorder: '#0c8599', primaryHoverUnderline: '#0c8599', primaryFocus: 'rgba(16, 152, 173, 0.5)', primaryInverse: '#ffffff' },
  { name: 'Cyan', color: '#0ca678', primary: '#0ca678', primaryBackground: '#0ca678', primaryBorder: '#0ca678', primaryUnderline: 'rgba(12, 166, 120, 0.5)', primaryHover: '#099268', primaryHoverBackground: '#099268', primaryHoverBorder: '#099268', primaryHoverUnderline: '#099268', primaryFocus: 'rgba(12, 166, 120, 0.5)', primaryInverse: '#ffffff' },
  { name: 'Jade', color: '#2f9e44', primary: '#2f9e44', primaryBackground: '#2f9e44', primaryBorder: '#2f9e44', primaryUnderline: 'rgba(47, 158, 68, 0.5)', primaryHover: '#2b8a3e', primaryHoverBackground: '#2b8a3e', primaryHoverBorder: '#2b8a3e', primaryHoverUnderline: '#2b8a3e', primaryFocus: 'rgba(47, 158, 68, 0.5)', primaryInverse: '#ffffff' },
  { name: 'Green', color: '#37b24d', primary: '#37b24d', primaryBackground: '#37b24d', primaryBorder: '#37b24d', primaryUnderline: 'rgba(55, 178, 77, 0.5)', primaryHover: '#2f9e44', primaryHoverBackground: '#2f9e44', primaryHoverBorder: '#2f9e44', primaryHoverUnderline: '#2f9e44', primaryFocus: 'rgba(55, 178, 77, 0.5)', primaryInverse: '#ffffff' },
  { name: 'Lime', color: '#74b816', primary: '#74b816', primaryBackground: '#74b816', primaryBorder: '#74b816', primaryUnderline: 'rgba(116, 184, 22, 0.5)', primaryHover: '#66a80f', primaryHoverBackground: '#66a80f', primaryHoverBorder: '#66a80f', primaryHoverUnderline: '#66a80f', primaryFocus: 'rgba(116, 184, 22, 0.5)', primaryInverse: '#ffffff' },
  { name: 'Yellow', color: '#fcc419', primary: '#fcc419', primaryBackground: '#fcc419', primaryBorder: '#fcc419', primaryUnderline: 'rgba(252, 196, 25, 0.5)', primaryHover: '#fab005', primaryHoverBackground: '#fab005', primaryHoverBorder: '#fab005', primaryHoverUnderline: '#fab005', primaryFocus: 'rgba(252, 196, 25, 0.5)', primaryInverse: '#ffffff' },
  { name: 'Amber', color: '#f59f00', primary: '#f59f00', primaryBackground: '#f59f00', primaryBorder: '#f59f00', primaryUnderline: 'rgba(245, 159, 0, 0.5)', primaryHover: '#e67700', primaryHoverBackground: '#e67700', primaryHoverBorder: '#e67700', primaryHoverUnderline: '#e67700', primaryFocus: 'rgba(245, 159, 0, 0.5)', primaryInverse: '#ffffff' },
  { name: 'Pumpkin', color: '#e67700', primary: '#e67700', primaryBackground: '#e67700', primaryBorder: '#e67700', primaryUnderline: 'rgba(230, 119, 0, 0.5)', primaryHover: '#d9480f', primaryHoverBackground: '#d9480f', primaryHoverBorder: '#d9480f', primaryHoverUnderline: '#d9480f', primaryFocus: 'rgba(230, 119, 0, 0.5)', primaryInverse: '#ffffff' },
  { name: 'Orange', color: '#fd7e14', primary: '#fd7e14', primaryBackground: '#fd7e14', primaryBorder: '#fd7e14', primaryUnderline: 'rgba(253, 126, 20, 0.5)', primaryHover: '#e8590c', primaryHoverBackground: '#e8590c', primaryHoverBorder: '#e8590c', primaryHoverUnderline: '#e8590c', primaryFocus: 'rgba(253, 126, 20, 0.5)', primaryInverse: '#ffffff' },
  { name: 'Sand', color: '#d9480f', primary: '#d9480f', primaryBackground: '#d9480f', primaryBorder: '#d9480f', primaryUnderline: 'rgba(217, 72, 15, 0.5)', primaryHover: '#c07000', primaryHoverBackground: '#c07000', primaryHoverBorder: '#c07000', primaryHoverUnderline: '#c07000', primaryFocus: 'rgba(217, 72, 15, 0.5)', primaryInverse: '#ffffff' },
  { name: 'Grey', color: '#868e96', primary: '#868e96', primaryBackground: '#868e96', primaryBorder: '#868e96', primaryUnderline: 'rgba(134, 142, 150, 0.5)', primaryHover: '#748094', primaryHoverBackground: '#748094', primaryHoverBorder: '#748094', primaryHoverUnderline: '#748094', primaryFocus: 'rgba(134, 142, 150, 0.5)', primaryInverse: '#ffffff' },
  { name: 'Zinc', color: '#6c757d', primary: '#6c757d', primaryBackground: '#6c757d', primaryBorder: '#6c757d', primaryUnderline: 'rgba(108, 117, 125, 0.5)', primaryHover: '#5c636a', primaryHoverBackground: '#5c636a', primaryHoverBorder: '#5c636a', primaryHoverUnderline: '#5c636a', primaryFocus: 'rgba(108, 117, 125, 0.5)', primaryInverse: '#ffffff' },
  { name: 'Slate', color: '#495057', primary: '#495057', primaryBackground: '#495057', primaryBorder: '#495057', primaryUnderline: 'rgba(73, 80, 87, 0.5)', primaryHover: '#343a40', primaryHoverBackground: '#343a40', primaryHoverBorder: '#343a40', primaryHoverUnderline: '#343a40', primaryFocus: 'rgba(73, 80, 87, 0.5)', primaryInverse: '#ffffff' },
];

export default function ColorPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [themeMode, setThemeMode] = useState<ThemeMode>('auto');

  useEffect(() => {
    // 从 localStorage 读取保存的颜色主题
    const savedColor = localStorage.getItem('pico-theme-color');
    if (savedColor) {
      setSelectedColor(savedColor);
      applyColorTheme(savedColor);
    }

    // 从 localStorage 读取主题模式偏好
    const savedThemeMode = localStorage.getItem('themeMode') as ThemeMode | null;
    const initialThemeMode = savedThemeMode || 'auto';
    setThemeMode(initialThemeMode);
    applyTheme(initialThemeMode);
  }, []);

  const applyTheme = (mode: ThemeMode) => {
    let theme: 'light' | 'dark';
    
    if (mode === 'auto') {
      // 自动：根据系统偏好
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme = prefersDark ? 'dark' : 'light';
    } else {
      // 手动设置
      theme = mode;
    }
    
    document.documentElement.setAttribute('data-theme', theme);
    
    // 更新 Giscus 主题
    const iframe = document.querySelector('iframe.giscus-frame') as HTMLIFrameElement;
    if (iframe) {
      iframe.contentWindow?.postMessage(
        { giscus: { setConfig: { theme } } },
        'https://giscus.app'
      );
    }
  };

  const applyColorTheme = (colorName: string | null) => {
    if (!colorName) {
      // 恢复默认主题，清除所有自定义 CSS 变量
      const properties = [
        '--pico-primary',
        '--pico-primary-background',
        '--pico-primary-border',
        '--pico-primary-underline',
        '--pico-primary-hover',
        '--pico-primary-hover-background',
        '--pico-primary-hover-border',
        '--pico-primary-hover-underline',
        '--pico-primary-focus',
        '--pico-primary-inverse',
      ];
      properties.forEach(prop => document.documentElement.style.removeProperty(prop));
      return;
    }

    const theme = colorThemes.find(t => t.name === colorName);
    if (!theme) return;

    // 设置亮色模式的 CSS 变量
    document.documentElement.style.setProperty('--pico-primary', theme.primary);
    document.documentElement.style.setProperty('--pico-primary-background', theme.primaryBackground);
    document.documentElement.style.setProperty('--pico-primary-border', theme.primaryBorder);
    document.documentElement.style.setProperty('--pico-primary-underline', theme.primaryUnderline);
    document.documentElement.style.setProperty('--pico-primary-hover', theme.primaryHover);
    document.documentElement.style.setProperty('--pico-primary-hover-background', theme.primaryHoverBackground);
    document.documentElement.style.setProperty('--pico-primary-hover-border', theme.primaryHoverBorder);
    document.documentElement.style.setProperty('--pico-primary-hover-underline', theme.primaryHoverUnderline);
    document.documentElement.style.setProperty('--pico-primary-focus', theme.primaryFocus);
    document.documentElement.style.setProperty('--pico-primary-inverse', theme.primaryInverse);
  };

  const handleColorClick = (colorName: string) => {
    setSelectedColor(colorName);
    applyColorTheme(colorName);
    localStorage.setItem('pico-theme-color', colorName);
  };

  const handleThemeModeClick = (mode: ThemeMode) => {
    setThemeMode(mode);
    localStorage.setItem('themeMode', mode);
    applyTheme(mode);
  };

  const handleResetDefault = () => {
    setSelectedColor('');
    applyColorTheme(null);
    localStorage.removeItem('pico-theme-color');
  };

  const getThemeLabel = () => {
    switch (themeMode) {
      case 'auto':
        return 'Auto';
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
    }
  };

  return (
    <>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
        data-tooltip="点击切换主题"
      >
        <PaletteIcon />
      </a>

      {isOpen && (
        <dialog open className="color-picker-modal">
          <div className="color-picker-content">
            <div className="color-picker-header">
              <h6>Theme Settings</h6>
              <button
                className="close-button"
                onClick={() => setIsOpen(false)}
                aria-label="关闭"
              >
                ✕
              </button>
            </div>
            
            {/* 主题模式选择 */}
            <div className="theme-mode-section">
              <label className="theme-section-label">Mode</label>
              <div className="theme-mode-buttons">
                {(['auto', 'light', 'dark'] as ThemeMode[]).map((mode) => (
                  <button
                    key={mode}
                    className={`theme-mode-button ${themeMode === mode ? 'active' : ''}`}
                    onClick={() => handleThemeModeClick(mode)}
                  >
                    {mode === 'auto' ? 'Auto' : mode === 'light' ? 'Light' : 'Dark'}
                    {themeMode === mode && <span className="checkmark">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* 颜色主题选择 */}
            <div className="color-theme-section">
              <label className="theme-section-label">Color</label>
              <div className="color-grid">
                {colorThemes.map((theme) => (
                  <button
                    key={theme.name}
                    className={`color-button ${selectedColor === theme.name ? 'active' : ''}`}
                    style={{ backgroundColor: theme.color }}
                    onClick={() => handleColorClick(theme.name)}
                    title={theme.name}
                    aria-label={`切换到${theme.name}主题`}
                  >
                    {selectedColor === theme.name && (
                      <span className="checkmark">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="color-picker-footer">
              <button
                className="outline secondary"
                onClick={handleResetDefault}
                disabled={!selectedColor}
              >
                Reset Color
              </button>
            </div>
          </div>
          <form method="dialog" className="color-picker-overlay" onSubmit={(e) => { e.preventDefault(); setIsOpen(false); }}></form>
        </dialog>
      )}
    </>
  );
}