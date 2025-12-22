import { baseUrl } from "../config";
import axois from "../utils/axiosExport";
 

export function getBridgePrice(data?: any) {
  return axois.request({
    url: `${baseUrl}bapi/price?srcChainId=${data?.srcChainId}&dstChainId=${data?.dstChainId}`,
    method: "GET",
  });
} 
export function getWithdrawTx(data?: any) {
  return axois.request({
    url: `${baseUrl}bapi/withdraw/tx?address=${data?.address}&txhash=${data?.txhash}`,
    method: "GET",
  });
} 
export function getSwapBalance(chainId?: any) {
  return axois.request({
    url: `${baseUrl}bapi/balance?chainId=${chainId}`,
    method: "GET",
  });
} 