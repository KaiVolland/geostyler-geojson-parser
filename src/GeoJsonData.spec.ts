import GeoJsonData from './GeoJsonData';

// it('GeoJsonDataParser is defined', () => {
//   expect(GeoJsonDataParser).toBeDefined();
// });

// describe('GeoJsonDataParser implements DataParser', () => {

//   it('readData is defined', () => {
//     const gjParser = new GeoJsonDataParser();
//     expect(gjParser.readData).toBeDefined();
//   });

// });

describe('readData implementation', () => {

  it('works as expected and returns the correct data', () => {

    const geojson = {
      type: 'FeatureCollection',
        features: [
          {
            id: 1,
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [1, 1]
            },
            properties: {
              propString: 'A feature with ID 1',
              propNumber: 10,
              propBoolean: true,
              propArray: ['1111', 'Berga', 'foo'],
              anotherPropNumber: 400.5
            }
          },
          {
            id: 2,
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [2, 2]
            },
            properties: {
              propString: 'A feature with ID 2',
              propNumber: 20,
              propBoolean: true,
              propArray: ['2222', 'hello', 'bar'],
              anotherPropNumber: 200.5
            }
          },
          {
            id: 3,
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [3, 3]
            },
            properties: {
              propString: 'A feature with ID 3',
              propNumber: 30,
              propBoolean: true,
              propArray: ['3333', 'another', '...'],
              anotherPropNumber: 300.5
            }
          },
          {
            id: 4,
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [4, 4]
            },
            properties: {
              propString: 'A feature with ID 4',
              propNumber: 40,
              propBoolean: true,
              propArray: ['4444', 'more', 'and more'],
              anotherPropNumber: 100.5
            }
          }
        ]
      };

    // const gjParser = new GeoJsonDataParser();
    // const output = gjParser.readData(geojson);
    const output = new GeoJsonData();
    output.readData(geojson);
    expect(output).toBeDefined();
    expect(output.exampleFeatures.features.length).toBe(4);

    const expectedSchema = {
      'type': 'object',
      'properties': {
        'propString': {
          'type': 'string'
        },
        'propNumber': {
          'type': 'number',
          'minimum': 10,
          'maximum': 40
        },
        'propBoolean': {
          'type': 'boolean'
        },
        'propArray': {
          'type': 'array'
        },
        'anotherPropNumber': {
          'type': 'number',
          'minimum': 100.5,
          'maximum': 400.5
        },
      }
    };
    expect(output.schema).toEqual(expectedSchema);
  });

  it('exits when an invalid geojson is given as input', () => {
    const invalidGeojson = {
      type: 'FeatureCollection',
      foo: 'bar',
      kalle: 'Berga'
    };
    // const gjParser = new GeoJsonDataParser();
    // let output;
    const output = new GeoJsonData();
    try {
      output.readData(invalidGeojson);
    } catch (error) {
      expect(output.schema).toBeUndefined();
    }
  });

  it('exits when an invalid data is given as input', () => {
    const invalidData = '<?xml version="1.0" encoding="UTF-8"?><foo>123</foo>';
    // const gjParser = new GeoJsonDataParser();
    // let output;
    const output = new GeoJsonData();
    try {
      output.readData(invalidData);
    } catch (error) {
      expect(output.schema).toBeUndefined();
    }
  });

});
