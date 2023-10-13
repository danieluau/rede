import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../../axios";
import { useContext } from "react";
import UserContext from "@/context/UserContext";
import Link from "next/link";


interface IFriendship{
    id: number,
    follower_id: number
    followed_id: number
    username: string
    userImg: string
}


function Friendshiptable() {


    const {user} = useContext(UserContext)
    const queryClient = useQueryClient()

    const {data, error} = useQuery({
        queryKey:[`friendship-${user?.id}`], 
        queryFn:()=> makeRequest.get('friendship/?follower_id=' + user?.id).then((res)=>{
            return res.data.data;
        })
    })
    
    if(error){
        console.log(error)
    }


    const mutation = useMutation({
        mutationFn: (unfollow:{followed_id: number; follower_id: number}) =>  
        makeRequest.delete(`friendship/?follower_id=${unfollow.follower_id}&followed_id=${unfollow.followed_id}`)
        .then((res)=> res.data), 
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey:['']})
        },
      
      })


    return (    
        <div className="w-1/6 mr-4 text-gray-600 flex flex-col gap-4">
            <span className="font-bold border-b">seguindo</span>
            {data?.map((friendship: IFriendship)=>{
                return (
                    <div key={friendship.id} className="flex gap-2 items-center justify-between">
                        <Link href={`profile?id=${friendship.followed_id}`} className="flex gap-2 items-center">
                        <img 
                        src={friendship.userImg? friendship.userImg: 'https://www.digitary.net/wp-content/uploads/2021/07/Generic-Profile-Image.png'} 
                        alt="imagem do perfil" 
                        className="u-8 h-8 rounded-full" />
                        <span className="font-bold">{friendship.username}</span>
                        </Link>
                        <button onClick={()=>user && mutation.mutate({followed_id: friendship.followed_id, follower_id:user?.id})} className="px-2 py-1 bg-zinc-300 font-semibold rounded-md hover:text-black" >deixar de seguir</button>
                    </div>
                )
            })}
        </div>
        )
}

export default Friendshiptable;