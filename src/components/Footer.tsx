import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <p>本アプリで使用している画像は、以下のサイトからの提供です。</p>
            <div className="sources">
                <p>- <a href="https://mj-king.net/sozai/">麻雀王国 - 麻雀素材</a></p>
            </div>
        </footer>
    )
};

export default Footer;