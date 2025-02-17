import { Router } from 'express';
import { CategoryService } from '@/services/categoryService';
import { DynamoDB } from 'aws-sdk';

const router = Router();
const dynamodb = new DynamoDB.DocumentClient();

router.post('/', async (req, res) => {
  try {
    const status = await CategoryService.triggerImport(req.body);
    res.status(202).json(status);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:importId/status', async (req, res) => {
  try {
    const status = await CategoryService.getImportStatus(
      req.params.importId,
      req.query.websiteUrl as string
    );
    res.json(status);
  } catch (error: any) {
    if (error.message === 'Import not found') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

router.delete('/:categoryId', async (req, res) => {
  try {
    await CategoryService.deleteCategory(
      req.params.categoryId,
      req.query.websiteUrl as string
    );
    res.json({ 
      message: 'Category deleted successfully',
      categoryId: req.params.categoryId,
      websiteUrl: req.query.websiteUrl
    });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:importId/categories', async (req, res) => {
  try {
    const { importId } = req.params;
    const { websiteUrl } = req.query;

    const params = {
      TableName: process.env.CATEGORIES_TABLE!,
      IndexName: 'importId-index', 
      KeyConditionExpression: 'importId = :importId',
      ExpressionAttributeValues: {
        ':importId': importId
      }
    };

    const result = await dynamodb.query(params).promise();
    res.json(result.Items);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal Server Error'
    });
  }
});


export default router;