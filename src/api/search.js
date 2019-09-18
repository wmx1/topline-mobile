import request from '@/utils/request'

//联想建议
export const getSuggestion = q => {
    return request({
        method: 'GET',
        url: '/app/v1_0/suggestion',
        params: {
            q
        }
    })
}

// 获取搜索结果
export const getSearch = ({
    q,
    page = 1,
    per_page = 10
}) => {
    return request({
        method: 'GET',
        url: '/app/v1_0/search',
        params: {
            q, 
            page,
            per_page
        }
    })
}
