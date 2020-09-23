using ExcelDataReader;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ark_utilities_web.api.DataAgents
{
    public class DropboxDataAgent
    {
        //private const string url = "https://www.dropbox.com/s/v4dn5tbtr21pnk6/arkexport.xlsx?dl=1";
        private const string url = "http://88.218.227.56/arkexport/arkexport.xlsx";

        
        public async Task<string> DownloadDinosaursFile()
        {
            HttpClientHandler handler = new HttpClientHandler();
            HttpClient client = new HttpClient(handler);

            try
            {
                Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
                handler.UseDefaultCredentials = true;
                handler.AllowAutoRedirect = true;
                HttpResponseMessage response = await client.GetAsync(url);

                response.EnsureSuccessStatusCode();
                
                if (response.IsSuccessStatusCode)
                {
                    System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
                    System.Net.Http.HttpContent content = response.Content;
                    var contentStream = await content.ReadAsStreamAsync(); // get the actual content stream
                    var excelContent = ParseExcel(contentStream);
                    return JsonConvert.SerializeObject(excelContent);
                }
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine("\nException Caught!");
                Console.WriteLine("Message :{0} ", e.Message);
            }
            finally
            {
                // Need to call dispose on the HttpClient and HttpClientHandler objects
                // when done using them, so the app doesn't leak resources
                handler.Dispose();
                client.Dispose();
            }

            return string.Empty;
        }
        public IEnumerable<Dictionary<string, object>> ParseExcel(Stream document)
        {
            using (var reader = ExcelReaderFactory.CreateReader(document))
            {
                var result = reader.AsDataSet(new ExcelDataSetConfiguration()
                {
                    UseColumnDataType = true,
                    FilterSheet = (tableReader, sheetIndex) => true,
                    ConfigureDataTable = (tableReader) => new ExcelDataTableConfiguration()
                    {
                        UseHeaderRow = true,
                    }
                });
                return MapDatasetData(result.Tables.Cast<DataTable>().ToList());
            }
        }
        public IEnumerable<Dictionary<string, object>> MapDatasetData(IEnumerable<DataTable> tables)
        {
            foreach (DataTable dt in tables)
            foreach (DataRow dr in dt.Rows)
            {
                var row = new Dictionary<string, object>();
                row.Add("sheet", dt.TableName);

                foreach (DataColumn col in dt.Columns)
                {
                    row.Add(col.ColumnName, dr[col]);
                }
                yield return row;
            }
        }
    }
}
