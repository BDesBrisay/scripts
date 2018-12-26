import React from 'react';
import { FaTwitter, FaCode, FaRedditAlien, FaComments, FaGlobe, FaBullhorn, FaCompass, FaComment } from 'react-icons/lib/fa';

import { formatNumber } from '../../../utils/formatNumber';
import sharedStyles from '../index.css';
import styles from './CryptoInfo.css'

const CryptoInfo = ({ query, data, packageKey }) => {
  const current = Object.values(data.currentData)[0];
  const meta = Object.values(data.metaData)[0];
  const quote = Object.values(current.quote)[0];
  const updatedOn = new Date(current.last_updated);

  return (
    <div className={styles.answerCol}>
      <div className={sharedStyles.answerRow}>
        <div className={styles.mainCol}>
          <div className={styles.headerRow}>
            {meta.logo &&
              <img src={meta.logo} className={styles.logo} alt="" />
            }
            {(meta.name && meta.symbol) &&
              <h2 className={styles.name}>{meta.name} ({meta.symbol})</h2>
            }
            {meta.category &&
              <div className={styles.tag}>{meta.category.toUpperCase()}</div>
            }
            {(meta.tags !== null) && meta.tags.map((tag, index) => (
              <div 
                className={styles.tag} 
                key={index}
                style={{backgroundColor: '#0c9'}}  
              >
                {tag.toUpperCase()}
              </div>
            ))}
          </div>
          <div className={styles.priceRow}>
            {quote.price &&
              <div className={styles.priceItem}>
                <p className={styles.priceLabel}>Price</p>
                <h1 
                  className={styles.price} 
                  style={(quote.percent_change_24h > 0) ? {color: '#00b386'} : {color: '#ff5050'}}
                >
                  {formatNumber(quote.price.toFixed(4))}<span> USD</span>
                </h1>
              </div>
            }
            {quote.percent_change_1h &&
              <div className={styles.priceItem}>
                <p className={styles.priceLabel}>Hourly</p>
                <h1 
                  className={styles.price} 
                  style={(quote.percent_change_1h > 0) ? {color: '#00b386'} : {color: '#ff5050'}}
                >
                  {quote.percent_change_1h.toFixed(4)}%
                </h1>
              </div>
            }
            {quote.percent_change_24h &&
              <div className={styles.priceItem}>
                <p className={styles.priceLabel}>Daily</p>
                <h1 
                  className={styles.price} 
                  style={(quote.percent_change_24h > 0) ? {color: '#00b386'} : {color: '#ff5050'}}
                >
                  {quote.percent_change_24h.toFixed(4)}%
                </h1>
              </div>
            }
            {quote.percent_change_7d &&
              <div className={styles.priceItem}>
                <p className={styles.priceLabel}>Weekly</p>  
                <h1 
                  className={styles.price} 
                  style={(quote.percent_change_7d > 0) ? {color: '#00b386'} : {color: '#ff5050'}}
                >
                  {quote.percent_change_7d.toFixed(4)}%
                </h1>
              </div>
            }
          </div>
          <div className={styles.linkContain}>
            {meta.urls.website.map((item, index) => (
              <a href={item} key={index} className={styles.linkItem}>
                <FaGlobe />
                <span>Website</span>
              </a>
            ))}
            {meta.urls.source_code.map((item, index) => (
              <a href={item} key={index} className={styles.linkItem}>
                <FaCode />
                <span>Source Code</span>
              </a>
            ))}
            {meta.urls.announcement.map((item, index) => (
              <a href={item} key={index} className={styles.linkItem}>
                <FaBullhorn />
                <span>Announcement</span>
              </a>
            ))}
            {meta.urls.chat.map((item, index) => (
              <a href={item} key={index} className={styles.linkItem}>
                <FaComment />
                <span>Chat</span>
              </a>
            ))}
            {meta.urls.message_board.map((item, index) => (
              <a href={item} key={index} className={styles.linkItem}>
                <FaComments />
                <span>Message Board</span>
              </a>
            ))}
            {meta.urls.reddit.map((item, index) => (
              <a href={item} key={index} className={styles.linkItem}>
                <FaRedditAlien />
                <span>Reddit</span>
              </a>
            ))}
            {meta.urls.twitter.map((item, index) => (
              <a href={item} key={index} className={styles.linkItem}>
                <FaTwitter />
                <span>Twitter</span>
              </a>
            ))}
            {meta.urls.explorer.length > 0 &&
              <div className={styles.explorer}>
                <div className={styles.explorerTitle}><FaCompass size={20} /> <span>Explore more</span></div>
                {meta.urls.explorer.map((item, index) => (
                  <div key={index} className={styles.explorerOuter}>
                    <a href={item} className={styles.explorerLink}>
                      <span>{item}</span>
                    </a>
                  </div>
                ))}
              </div>
            }
          </div>
          {updatedOn &&
            <p className={styles.priceLabel}>Last updated on {updatedOn.toLocaleString('en-US')}</p>
          }
        </div>
        <div className={styles.sideContain}>
          {current.cmc_rank &&
            <h3 className={styles.rank}>Ranked <span>{current.cmc_rank}</span> by CoinMarketCap</h3>
          }
          <div className={styles.supplyContain}>
            {quote.market_cap &&
              <div className={styles.priceItem}>
                <p className={styles.priceLabel}>Market Cap</p>
                <h1 className={styles.price}>{formatNumber(quote.market_cap.toFixed(0))} <span>USD</span></h1>
              </div>
            }
            {quote.volume_24h &&
              <div className={styles.priceItem}>
                <p className={styles.priceLabel}>Volume 24h</p>
                <h1 className={styles.price}>{formatNumber(quote.volume_24h.toFixed(0))} <span>USD</span></h1>
              </div>
            }
            {current.circulating_supply &&
              <div className={styles.priceItem}>
                <p className={styles.priceLabel}>Circulating Supply</p>
                <h1 className={styles.price}>{formatNumber(current.circulating_supply)}</h1>
              </div>
            }
            {current.total_supply &&
              <div className={styles.priceItem}>
                <p className={styles.priceLabel}>Total Supply</p>
                <h1 className={styles.price}>{formatNumber(current.total_supply)}</h1>
              </div>
            }
            {current.max_supply &&
              <div className={styles.priceItem}>
                <p className={styles.priceLabel}>Max Supply</p>
                <h1 className={styles.price}>{formatNumber(current.max_supply)}</h1>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CryptoInfo;