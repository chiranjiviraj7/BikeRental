using BikeRentalAPI.Models;

namespace BikeRentalAPI.Services
{
    public interface ICustomerService
    {
        Task<IEnumerable<Customer>> GetCustomersAsync();
        Task<Customer?> GetCustomerByIdAsync(int id);
        Task<Customer?> GetCustomerByNameAsync(string name);
        Task<Customer?> GetCustomerByNameAndPhoneAsync(string name, string phone);
        Task<Customer> AddCustomerAsync(Customer customer);
        Task<bool> UpdateCustomerAsync(int id, Customer customer);
        Task<bool> DeleteCustomerAsync(int id);
    }
}
