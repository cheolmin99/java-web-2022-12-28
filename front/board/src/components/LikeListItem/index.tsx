import { Avatar, Box, Typography } from '@mui/material'
import { ILikeUser, Liky } from 'src/interfaces'

interface Props {
    likeUser: Liky
}

export default function LikeListItem({ likeUser }: Props) {

  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', mr: '30px' }}>
        <Avatar sx={{ height: '32px', width: '32px', mr: '8px' }} src={likeUser?.userProfileUrl ? likeUser?.userProfileUrl : ''} />
        <Typography component='span' sx={{ fontSize: '16px', fontWeight: 500 }}>{likeUser?.userNickname}</Typography>
    </Box>
  )
}
