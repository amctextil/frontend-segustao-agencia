export enum UserProfile {
  ADMIN = 1,
  SELLER = 2,
  // MANAGER = 3,
}

export const getUserProfileName = (profile: UserProfile) => {
  const profileMap = {
    [UserProfile.ADMIN]: 'Administrador',
    [UserProfile.SELLER]: 'Vendedor',
    // [UserProfile.MANAGER]: 'Gerente',
  };

  return profileMap[profile];
};
