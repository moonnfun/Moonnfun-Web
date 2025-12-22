
import { Dropdown, notification, Popover, Progress } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { truncateMiddle } from "../../../utils/truncateMiddle";
import {
  detectLanguage,
  formatAmount,
  getBit,
  parseScientificNumber,
  sciToNum,
  showLoding,
} from "../../../utils/tool";
import { isMain } from "../../../config";
import { useTranslation } from "react-i18next";
import { wsBus } from "../../../utils/wsBus";
import { userFollow } from "../../../API";
import { useAppKit, useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { getChainConfig } from "../../../getChainConfig";
interface MyComponentProps {
  items: any;
}
const App: React.FC<MyComponentProps> = ({ items }) => {
  const { address: web3ModalAccount } = useAppKitAccount();
  let { t, i18n } = useTranslation();

  const browserUrl = (key: any) => {
    return ([56, 97].includes(Number(key)) ? (isMain ? 'https://bscscan.com' : 'https://testnet.bscscan.com') :
      [11952, 196].includes(Number(key)) ? (isMain ? 'https://www.oklink.com/zh-hans/x-layer' : 'https://www.oklink.com/zh-hans/x-layer-testnet') :
        [1329, 1328, 113329].includes(Number(key)) ? (isMain ? "https://seitrace.com" : "https://testnet.seitrace.com") :
          [8453, 84532].includes(Number(key)) ? (isMain ? 'https://base.blockscout.com' : 'https://sepolia-explorer.base.org') :
            'https://bscscan.com')
  }


  const items2 = items.map((item: any, index: any) => ({
    key: index,
    label: ( 
      <div>
        {
          item?.error ?
            <Popover
              content={<div className="w-[306px]">{item?.error}</div>}
              trigger="hover"
            >
              <div className="flex items-center text-[#fff] text-[14px] font-[500] hover:text-[#FFFD41]">
                {truncateMiddle(item?.error, 8, 4)}
                <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M7.9998 2.2998C4.8518 2.2998 2.2998 4.8518 2.2998 7.9998C2.2998 11.1478 4.8518 13.6998 7.9998 13.6998C11.1478 13.6998 13.6998 11.1478 13.6998 7.9998C13.6998 4.8518 11.1478 2.2998 7.9998 2.2998ZM7.9998 3.2998C10.5958 3.2998 12.6998 5.4038 12.6998 7.9998C12.6998 10.5958 10.5958 12.6998 7.9998 12.6998C5.4038 12.6998 3.2998 10.5958 3.2998 7.9998C3.2998 5.4038 5.4038 3.2998 7.9998 3.2998Z" fill="#5F5F5F" />
                  <path d="M7.99998 7.22363C8.34665 7.22363 8.51998 7.39697 8.51998 7.74363V10.4476C8.51998 10.7943 8.34665 10.9676 7.99998 10.9676C7.65331 10.9676 7.47998 10.7943 7.47998 10.4476V7.74363C7.47998 7.39697 7.65331 7.22363 7.99998 7.22363Z" fill="#5F5F5F" />
                  <path d="M7.24023 5.79223C7.24023 5.99379 7.32031 6.1871 7.46283 6.32963C7.60536 6.47216 7.79867 6.55223 8.00023 6.55223C8.2018 6.55223 8.39511 6.47216 8.53764 6.32963C8.68016 6.1871 8.76023 5.99379 8.76023 5.79223C8.76023 5.59066 8.68016 5.39735 8.53764 5.25483C8.39511 5.1123 8.2018 5.03223 8.00023 5.03223C7.79867 5.03223 7.60536 5.1123 7.46283 5.25483C7.32031 5.39735 7.24023 5.59066 7.24023 5.79223Z" fill="#5F5F5F" />
                </svg>
              </div>
            </Popover >
            : 
            <a
              href={`${browserUrl(Number(item?.chainId))}/tx/${item?.txhash}`}
              className="text-[#fff] text-[14px] font-[500] hover:text-[#FFFD41]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className={`flex items-center text-[18px] pb-6 pt-4 font-[500] text-[#fff] underline h5:text-[12px]`}
              >
                {truncateMiddle(item?.txhash, 8, 4)}
              </div>
            </a>
        }
      </div>
    ),
  }));

  return (
    <div>
      {
        items && items.length > 0 ?
          <div className="bg-[#2E2E2E] rounded-[20px] px-[30px] py-[16px] mt-[30px] flex items-center
          h5:p-[12px] h5:mt-[10px]">
            <div className="flex-1 text-[#FFFD41] text-[24px] font-[600]
            h5:text-[12px]">{t('248')}</div>
            <Dropdown menu={{ items: items2 }} placement="bottom"
              overlayClassName="bridge_dropdown"
              trigger={["hover"]}>
              <div className="flex items-center">
                <div className="text-[#fff] text-[20px] font-[600] pr-16 cursor-pointer
                h5:text-[14px] h5:pr-10">
                  {truncateMiddle(items[0]?.error || items[0]?.txhash, 8, 4)} 
                </div>
                <svg className='h5:w-[12px] cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="20" height="10" viewBox="0 0 20 10" fill="none">
                  <path d="M18.9414 0.274759C18.8757 0.197103 18.7954 0.133194 18.705 0.0866831C18.6147 0.0401724 18.5161 0.0119724 18.4149 0.00369315C18.3136 -0.00458611 18.2118 0.00721886 18.1151 0.0384324C18.0184 0.069646 17.9288 0.119657 17.8515 0.185607L10.5001 6.43978C10.3604 6.55835 10.1834 6.62342 10.0005 6.62342C9.81755 6.62342 9.64054 6.55835 9.50093 6.43978L2.14759 0.183668C2.07008 0.117831 1.98039 0.0679589 1.88365 0.0369033C1.78691 0.00584764 1.68502 -0.00578156 1.58379 0.00267803C1.48257 0.0111376 1.384 0.0395212 1.29371 0.0862065C1.20343 0.132892 1.12321 0.196963 1.05764 0.274759L0.182194 1.30969C0.0502113 1.46657 -0.0143456 1.66954 0.00268158 1.87409C0.0197087 2.07864 0.116931 2.26807 0.273025 2.40083L8.54045 9.43218H8.54818L8.57524 9.45737C8.9678 9.80694 9.47455 10 9.99953 10C10.5245 10 11.0313 9.80694 11.4238 9.45737L11.4509 9.43218H11.4605L19.726 2.40083C19.8036 2.33507 19.8675 2.25462 19.914 2.16408C19.9606 2.07354 19.9889 1.97469 19.9973 1.87317C20.0058 1.77166 19.9942 1.66947 19.9632 1.57245C19.9322 1.47543 19.8825 1.38549 19.8169 1.30775L18.9414 0.272821V0.274759Z" fill="#5F5F5F" />
                </svg>
              </div>
            </Dropdown>
          </div>
          : ''
      }
    </div>
  );
};

export default App;

