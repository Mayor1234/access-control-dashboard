// userStorage.ts
interface User {
  id: string;
  communityId: {
    id: string;
    name: string;
  };
  roleId: {
    id: string;
  };
}

class UserStorage {
  private static readonly USER_KEY = 'user_data';

  // Store entire user object
  static setUser(user: User): void {
    try {
      localStorage.setItem(UserStorage.USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Failed to store user data:', error);
    }
  }

  static getUser(): User | null {
    try {
      const userData = localStorage.getItem(UserStorage.USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Failed to retrieve user data:', error);
      return null;
    }
  }

  // Get specific IDs (convenience methods)
  static getUserId(): string | null {
    const user = this.getUser();
    return user?.id ?? null;
  }

  static getCommunityId(): string | null {
    const user = this.getUser();
    return user?.communityId?.id ?? null;
  }

  static getRoleId(): string | null {
    const user = this.getUser();
    return user?.roleId?.id ?? null;
  }

  // Clear all auth data
  static clear(): void {
    localStorage.removeItem(UserStorage.USER_KEY);
  }
}

export default UserStorage;
