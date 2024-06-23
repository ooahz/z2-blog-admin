export interface Friend {
  readonly id: string;
  website: string;
  name: string;
  description: string;
  avatar: string;
  weight: number;
  status: number;
  type: number;
}

export interface FriendFormProps {
  friendForm: Friend;
}
