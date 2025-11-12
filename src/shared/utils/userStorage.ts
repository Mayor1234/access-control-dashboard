class UserStorage {
  private static readonly USER_ID_KEY = 'community_admin_id';

  static getCommunityAdminId(): string | null {
    return localStorage.getItem(UserStorage.USER_ID_KEY);
  }

  static setCommunityAdminId(communityAdminId: string): void {
    localStorage.setItem(UserStorage.USER_ID_KEY, communityAdminId);
  }

  static removeCommunityAdminId(): void {
    localStorage.removeItem(UserStorage.USER_ID_KEY);
  }
}

export default UserStorage;
